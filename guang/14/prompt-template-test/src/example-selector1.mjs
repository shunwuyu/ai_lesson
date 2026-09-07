import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import {
  FewShotPromptTemplate,
  PromptTemplate,
} from '@langchain/core/prompts';
import { LengthBasedExampleSelector } from '@langchain/core/example_selectors';

// 演示：使用 LengthBasedExampleSelector 自动选择「长度合适」的 few-shot 示例

// 1. 初始化 Chat 模型
const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
});

// 2. 定义单条示例的 Prompt 模板
const examplePrompt = PromptTemplate.fromTemplate(
  `用户需求：{user_requirement}
周报片段示例：
{report_snippet}
---`
);

// 3. 构造一批「长度差异明显」的示例，方便观察选择效果
const examples = [
  {
    user_requirement: '本周主要在做基础设施稳定性治理，想突出风险控制。',
    report_snippet:
      `- 核心链路共处理 P1 级别故障 1 起，P2 故障 2 起，均在 SLA 内完成处置；\n` +
      `- 对 5 个高风险接口补充了限流与熔断策略，覆盖 80% 高峰流量；\n` +
      `- 新增 6 条针对延迟抖动的告警规则，减少漏报风险。`,
  },
  {
    user_requirement: '偏向对外展示成果，多写一些亮点和业务价值。',
    report_snippet:
      `- 上线「实时订单看板」，支持业务实时查看转化漏斗；\n` +
      `- 打通埋点 → 数据仓库 → 实时服务的闭环，支撑后续精细化运营；\n` +
      `- 完成 2 场内部分享，会后收到 15 条正向反馈。`,
  },
  {
    user_requirement:
      '只是想要一个非常简短的周报，两三句话就够了，主要告诉老板「一切稳定」即可。',
    report_snippet: `本周整体运行平稳，未发生重大事故，核心指标均在预期范围内。`,
  },
  {
    user_requirement:
      '需要一份比较详细的技术周报，涵盖研发、测试、上线、监控等各个环节，篇幅可以略长。',
    report_snippet:
      `- 研发：完成结算服务重构第一阶段，拆分出 3 个独立子服务，接口延迟较旧架构下降约 35%；\n` +
      `- 测试：补齐 20+ 条关键路径自动化用例，整体用例数量提升到 180 条，回归时间从 2 天缩短到 0.5 天；\n` +
      `- 上线：采用灰度 + Canary 策略，期间监控到 2 次轻微指标抖动，均在 5 分钟内回滚处理；\n` +
      `- 监控：新增 8 条核心告警和 3 个 SLO 指标，后续会结合值班反馈继续收敛噪音告警。`,
  },
];

// 4. 创建 LengthBasedExampleSelector
const exampleSelector = await LengthBasedExampleSelector.fromExamples(examples, {
  examplePrompt,
  // 这里简单地用字符长度近似控制，真实项目中可以配合 token 估算
  maxLength: 700,
  getTextLength: (text) => text.length,
});

// 5. 基于 selector 构建 FewShotPromptTemplate
const fewShotPrompt = new FewShotPromptTemplate({
  examplePrompt,
  exampleSelector,
  prefix:
    '下面是一些不同风格和长度的周报片段示例，你可以从中学习语气和结构：\n',
  suffix:
    '\n\n现在请根据上面的示例风格，为下面这个场景写一份新的周报：\n' +
    '场景描述：{current_requirement}\n' +
    '请输出一份适合发给老板和团队同步的 Markdown 周报草稿。',
  inputVariables: ['current_requirement'],
});

// 6. 演示：给定一个较长/较复杂的需求，让 selector 自动选出合适的示例
const currentRequirement =
  '我们本周在做「内部 AI 助手」项目，既有稳定性保障（处理线上问题），' +
  '也有新功能上线（接入知识库、日志检索）。希望周报既能体现「把坑都兜住了」，' +
  '又能展示一部分业务侧能感知到的亮点。';


const finalPrompt = await fewShotPrompt.format({
  current_requirement: currentRequirement,
});

// console.log(finalPrompt);

const finalPrompt2 = await fewShotPrompt.format({
    current_requirement: '',
});

console.log(finalPrompt2);

// const stream = await model.stream(finalPrompt);
// console.log('\n=== AI 输出 ===');
// for await (const chunk of stream) {
//   process.stdout.write(chunk.content);
// }

