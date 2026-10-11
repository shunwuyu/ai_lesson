import { 
  StateGraph,  // 状态图
  // MemorySaver 是内存存储，保存图中断时的会话状态，靠 thread_id 找回，只放内存，重启丢失。  
  MemorySaver, // 内存检查点存储器
  // Command 用来向图下发指令，恢复中断、传递人工输入，控制工作流走向。
  Command,
  START, // 开始节点
  END, // 结束节点
} from "@langchain/langgraph";
// 读取用户输入
import readline from "node:readline/promises";
// 从标准输入读取用户输入
import { stdin as input, stdout as output } from "node:process";


// 节点函数
const node1 = async () => {
  console.log("✅执行节点1");
  return { step: 1, msg: "节点1完成" };
};

const node2 = async () => {
  console.log("✅执行节点2");
  return { step: 2, msg: "节点2完成，等待人工审核" };
};

const humanReview = async (state) => {
  console.log("✅人工审核通过，进入节点3");
  return { step: 3, msg: "审核完成" };
};

const node4 = async () => {
  console.log("✅执行节点4，流程结束");
  return { step: 4, msg: "全部完成" };
};

// 图配置
const graphConfig = {
  step: { reducer: (_prev, curr) => curr },
  msg: { reducer: (_prev, curr) => curr },
};

// 构建图
// 状态通道
const builder = new StateGraph({ channels: graphConfig })
  .addNode("node1", node1)
  .addNode("node2", node2)
  .addNode("humanReview", humanReview)
  .addNode("node4", node4)
  .addEdge(START, "node1")
  .addEdge("node1", "node2")
  .addEdge("node2", "humanReview")
  .addEdge("humanReview", "node4")
  .addEdge("node4", END);

// 检查点存储器 + 编译，interruptBefore 断点
const checkpointer = new MemorySaver();
const graph = builder.compile({
  checkpointer, // 检查点存储器
  interruptBefore: ["humanReview"], // 断点节点
});

// thread_id 会话标识
const config = {
  configurable: {
    thread_id: "demo-thread-001",
  },
};

// 主执行函数，用顶层await（TS新版支持）
const main = async () => {
  const rl = readline.createInterface({ input, output });

  console.log("====启动流程====");
  // 第一次执行，跑到node2，在humanReview前暂停
  await graph.invoke({ step: 0, msg: "" }, config);

  // 获取当前快照，用于前端弹窗展示
  const stateSnapshot = await graph.getState(config);
  console.log("⏸️流程中断，待人工审批，下一个要执行节点：", stateSnapshot.next);

  // 真正卡在这里，等你在终端输入
  const answer = await rl.question("是否审核通过？输入 y 继续，其他任意内容则终止：");

  // 只有输入 y 才恢复执行
  if (answer.trim().toLowerCase() === "y") {
    console.log("✅审核通过，恢复执行");
    await graph.invoke(new Command({ resume: true }), config);
  } else {
    console.log("❌审核未通过，流程终止，未继续执行");
  }

  rl.close();
};

// 运行
main().catch(console.error);
