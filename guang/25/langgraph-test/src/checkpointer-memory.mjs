import {
  Annotation, // 申明状态
  END, 
  MemorySaver, // 内存保存器
  // 用于保存和恢复状态
  START,
  StateGraph,
} from "@langchain/langgraph";

const StateAnnotation = Annotation.Root({
  // 访问次数
  visitCount: Annotation({
    reducer: (_prev, next) => next,
    default: () => 0,
  }),
  message: Annotation({
    reducer: (_prev, next) => next,
    default: () => "",
  }),
});

/** 每跑一轮图，给「当前会话」访问次数 +1 */
function recordVisit(state) {
  const visitCount = state.visitCount + 1;
  const message =
    visitCount === 1
      ? "这是你在本会话里第 1 次进入。"
      : `这是你在本会话里第 ${visitCount} 次进入`;
  return { visitCount, message };
}
// 保存图的状态
const graph = new StateGraph(StateAnnotation)
  .addNode("recordVisit", recordVisit)
  .addEdge(START, "recordVisit")
  .addEdge("recordVisit", END);
// `MemorySaver`就是**内存版会话存储器**
// 靠`thread_id`区分不同会话，把每个线程的状态存到内存里。
const checkpointer = new MemorySaver(); 
const app = graph.compile({ checkpointer });
// `thread_id` 就是会话唯一身份证
// **MemorySaver 内部用 thread_id 做 key 存状态快照**。
// 靠传入的 thread_id 作为 key，MemorySaver 给每个 id 单独存一份状态，实现用户隔离。
const user1 = { configurable: { thread_id: "用户-小张" } };
const user2 = { configurable: { thread_id: "用户-小李" } };

const res1 = await app.invoke({}, user1);
const res2 = await app.invoke({}, user1);
const res3 = await app.invoke({}, user1);
const res4  = await app.invoke({}, user2);

console.log(res1)
console.log(res2);
console.log(res3);
console.log(res4);
