/**
 * Langfuse 离线评测：Dataset → Experiment（task + evaluators）→ Scores
 *
 * 流程：
 * 1. 确保评测 Dataset 存在并写入测试用例
 * 2. 对每条用例跑 Deep Agent（带 CallbackHandler，生成 Trace）
 * 3. 用确定性 evaluator 打分（关键词命中 / 必含数字等）
 * 4. 用 run-level evaluator 汇总平均分
 * 5. flush 后可在 Langfuse Datasets → Runs 对比结果
 */
import "./instrumentation.mjs";
// 导入 Langfuse 客户端，用于调用 Langfuse API
import { LangfuseClient } from "@langfuse/client";
// 导入 Langfuse CallbackHandler，用于在 DeepAgent 调用时记录 Trace
import { CallbackHandler } from "@langfuse/langchain";
// 导入 DeepAgent 实例创建函数
// 提取回复文本函数
import { createAgent, extractReply } from "./agent.mjs";
// 关闭 OTel SDK，停止采集 span
import { shutdownTracing } from "./instrumentation.mjs";
import "dotenv/config";

const DATASET_NAME = process.env.LANGFUSE_DATASET_NAME ?? "deepagents-eval";

/** 本地种子用例；expectedOutput.contains 为需在回复中出现的关键词（不区分大小写） */
// dataset seed 用例
const SEED_ITEMS = [
  {
    // 
    id: "weather-shanghai",
    input: "用工具查一下 Shanghai 的天气，直接告诉我结果。",
    // 预期回复中包含的关键词（不区分大小写）
    expectedOutput: {
      contains: ["31", "上海", "shanghai", "闷热", "多云"],
      // 最少命中一个关键词
      minHits: 1,
    },
    // 用例分类：天气查询
    metadata: { case: "weather" },
  },
  {
    id: "weather-tokyo",
    input: "用工具查一下 Tokyo 的天气。",
    expectedOutput: {
      contains: ["28", "东京", "tokyo", "晴"],
      minHits: 1,
    },
    metadata: { case: "weather" },
  },
  {
    id: "weather-beijing",
    input: "用工具查一下 Beijing 的天气。",
    expectedOutput: {
      contains: ["28", "北京", "beijing", "晴", "热"],
      minHits: 1,
    },
    metadata: { case: "weather" },
  },
  {
    id: "calculate-sum",
    input: "用计算器把 31 和 28 相加，只告诉我结果。",
    expectedOutput: {
      contains: ["59"],
      minHits: 1,
    },
    metadata: { case: "calculate" },
  },
  {
    id: "weather-then-sum",
    input:
      "查一下 Shanghai 和 Tokyo 的天气，再用计算器把两地气温数字相加（31+28），最后总结。",
    expectedOutput: {
      contains: ["31", "28", "59", "上海", "东京", "shanghai", "tokyo"],
      minHits: 3,
    },
    // e2e的意思是：端到端测试，即从用户输入到最终回复的完整流程
    // EndToEnd
    metadata: { case: "e2e" },
  },
];

async function ensureDataset(langfuse) {
  try {
    await langfuse.api.datasets.create({
      name: DATASET_NAME,
      description: "Deep Agents 天气/计算工具评测集",
      metadata: { app: "langfuse-test", version: "1" },
    });
    console.log(`created dataset: ${DATASET_NAME}`);
  } catch (err) {
    // 已存在则忽略
    const msg = err?.message ?? String(err);
    // 409 Conflict
    if (!/already|exist|409|conflict/i.test(msg)) {
      console.warn(`dataset create warning: ${msg}`);
    } else {
      console.log(`dataset exists: ${DATASET_NAME}`);
    }
  }

  for (const item of SEED_ITEMS) {
    await langfuse.dataset.createItem({
      datasetName: DATASET_NAME,
      id: `${DATASET_NAME}:${item.id}`,
      input: item.input,
      expectedOutput: item.expectedOutput,
      metadata: item.metadata,
    });
  }
  console.log(`upserted ${SEED_ITEMS.length} dataset items`);
}

/** 单条用例：跑 agent，返回最终回复字符串（作为 experiment output） */
async function runAgentTask(item) {
  // 创建 DeepAgent 实例
  const agent = createAgent();
  // 转换为字符串，确保输入是字符串类型
  const query = typeof item.input === "string" ? item.input : String(item.input);
  // 配置 CallbackHandler，把 span 导出到 Langfuse
  const handler = new CallbackHandler({
    // 会话 ID，用于关联所有 span
    sessionId: `eval-${DATASET_NAME}`,
    // 用户 ID，用于关联所有 span
    userId: "eval-runner",
    // 标签，用于分类 span 评估
    tags: ["deepagents", "evaluation"],
    // 跟踪元数据，用于关联 span 到具体用例
    traceMetadata: {
      dataset: DATASET_NAME,
      itemId: item.id,
      case: item.metadata?.case,
    },
  });

  const result = await agent.invoke(
    { messages: [{ role: "user", content: query }] },
    // agent 运行里不同阶段会触发 handler 里对应的钩子
    // 开始 LLM 调用
    // 工具返回结果
    // LLM 输出片段
    // 整个流程结束
    { callbacks: [handler], recursionLimit: 30 },
  );

  return extractReply(result);
}

/**
 * 关键词命中评估器
 * Item-level：检查回复是否包含足够多的期望关键词
 * expectedOutput: { contains: string[], minHits?: number }
 */
async function keywordHitEvaluator({ output, expectedOutput }) {
  const text = String(output ?? "").toLowerCase();
  // 针
  const needles = expectedOutput?.contains ?? [];
  // 最少命中关键词关键词数
  const minHits = expectedOutput?.minHits ?? 1;
  // 过滤出回复中包含的关键词
  const hits = needles.filter((k) => text.includes(String(k).toLowerCase()));
  // 判断是否命中足够多的关键词
  const passed = hits.length >= minHits;

  return {
    name: "keyword_hit",
    value: passed ? 1 : 0,
    comment: passed
      ? `命中 ${hits.length}/${needles.length}：${hits.join(", ") || "—"}`
      : `未达 minHits=${minHits}，仅命中：${hits.join(", ") || "无"}`,
  };
}

/** 
 * 回复非空评估器
 * Item-level：回复非空且有一定长度 
 */
async function nonEmptyEvaluator({ output }) {
  const text = String(output ?? "").trim();
  const ok = text.length >= 4;
  return {
    name: "non_empty",
    value: ok ? 1 : 0,
    comment: ok ? `长度 ${text.length}` : "回复为空或过短",
  };
}

/** 
 * 关键词命中平均分评估器
 * Run-level：keyword_hit 平均分
 * 这个函数拿到所有用例的关键词评测分，算出平均分，输出平均命中率；没有分数就返回 null 并提示。
 */
async function averageKeywordHit({ itemResults }) {
  // 从 itemResults 中提取 keyword_hit 分数
  const scores = itemResults
    // 从每个用例的评估结果中提取 keyword_hit 分数
    // flatMap 拍平一层
    .flatMap((r) => r.evaluations ?? [])
    // 过滤出 keyword_hit 分数
    .filter((e) => e.name === "keyword_hit")
    // 转换为数字
    .map((e) => Number(e.value))
    // 过滤出有限数字
    .filter((v) => Number.isFinite(v));

  if (scores.length === 0) {
    return { name: "avg_keyword_hit", value: null, comment: "无 keyword_hit 分数" };
  }
  // 计算平均分
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return {
    name: "avg_keyword_hit",
    value: avg,
    comment: `平均命中率 ${(avg * 100).toFixed(1)}%（${scores.length} 条）`,
  };
}

async function main() {
  // 创建 Langfuse 客户端
  const langfuse = new LangfuseClient();
  // 确保数据集存在，否则创建
  console.log("1) ensure dataset + seed items…");
  await ensureDataset(langfuse);
  
  console.log("2) run experiment on Langfuse dataset…");
  // 获取数据集实例
  const dataset = await langfuse.dataset.get(DATASET_NAME);
  // 运行实验
  const result = await dataset.runExperiment({
    name: "Deep Agents Tool Eval",
    description: "天气查询 + 计算器工具调用评测",
    runName: `run-${new Date().toISOString().replace(/[:.]/g, "-")}`,
    task: runAgentTask,
    // 评估器 
    evaluators: [keywordHitEvaluator, nonEmptyEvaluator],
    // 运行评估器 所有用例跑完、所有单条 evaluator 执行完之后，最后统一跑的聚合评估器
    runEvaluators: [averageKeywordHit],
    // 最大并发行数，避免对模型资源造成过大压力
    maxConcurrency: 1, // agent 调用较重，串行更稳
    metadata: {
      model: process.env.OPENAI_MODEL ?? "deepseek-v4-flash",
      app: "langfuse-test",
    },
  });

  console.log("\n3) experiment result:\n");
  console.log(await result.format());

  await langfuse.flush();
  console.log(`\n完成。到 Langfuse → Datasets →「${DATASET_NAME}」→ Runs 查看对比。`);
}

main()
  .catch((err) => {
    // 捕获并处理异常，确保程序退出
    // 打印错误信息，退出进程
    // 关闭 OTel SDK，停止采集 span
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await shutdownTracing();
  });
