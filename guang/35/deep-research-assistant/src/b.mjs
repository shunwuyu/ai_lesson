import {
  StateGraph,
  START,
  END,
  interrupt,
  Command,
  MemorySaver,
} from "@langchain/langgraph";
import { z } from "zod";

// 1. 定义状态
const StateSchema = z.object({
  todoList: z.array(z.string()).default([]),
  report: z.string().default(""),
});
// type AgentState = z.infer<typeof StateSchema>;

// 2. 节点1：生成调研todo
const genTodo = (state) => {
  console.log("【节点1】生成调研任务列表");
  return {
    todoList: ["搜索行业数据", "数据分析计算", "撰写调研报告"],
  };
};

// 3. 节点2：人工审批中断点（核心！）
const humanApproval = (state) => {
  console.log("【节点2】暂停，等待人工审批todo列表");
  // 中断，保存当前状态，返回给调用方
  const approveResult = interrupt({
    msg: "请审核待办列表，是否继续执行调研？",
    todoList: state.todoList,
  });
  // 恢复后，拿到人类输入
  return new Command({ update: { todoList: approveResult.newTodoList } });
};

// 4. 节点3：执行调研生成报告
const runResearch = (state) => {
  console.log("【节点3】执行子Agent调研，生成报告");
  return { report: `✅完成任务：${state.todoList.join("、")}` };
};

// 5. 构建图 + 挂载检查点（开启持久化）
const checkpointer = new MemorySaver();
const builder = new StateGraph(StateSchema)
  .addNode("genTodo", genTodo)
  .addNode("humanApproval", humanApproval)
  .addNode("runResearch", runResearch)
  .addEdge(START, "genTodo")
  .addEdge("genTodo", "humanApproval")
  .addEdge("humanApproval", "runResearch")
  .addEdge("runResearch", END);

const graph = builder.compile({ checkpointer });

// ========== 执行演示 ==========
async function main() {
  // 同一个 thread_id 代表同一份会话、同一个断点
  const threadConfig = { configurable: { thread_id: "research-thread-001" } };

  console.log("===== 第一轮执行：运行到中断点暂停 =====");
  // 第一次调用，执行到interrupt自动暂停
  const run1 = await graph.invoke({}, threadConfig);
  console.log("中断信息：", run1.__interrupt__);

  console.log("\n===== 恢复执行：传入人工审批结果，从断点继续 =====");
  // 传入Command resume，把人工结果送回去，继续往下执行
  const run2 = await graph.invoke(
    new Command({
      resume: { newTodoList: ["搜索行业数据", "数据分析计算", "撰写调研报告，增加数据图表"] },
    }),
    threadConfig
  );
  console.log("最终结果：", run2);
}

main();
