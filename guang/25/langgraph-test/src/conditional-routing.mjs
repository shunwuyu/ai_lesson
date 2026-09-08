import "dotenv/config";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
//Annotation 用于创建State, 指定默认值和合并逻辑(reducer)
// Annotation.Root 状态模板
const StateAnnotation = Annotation.Root({
  query: Annotation({
    reducer: (_prev, next) => next,
    default: () => "",
  }),
  route: Annotation({
    reducer: (_prev, next) => next,
    default: () => "chat",
  }),
  answer: Annotation({
    reducer: (_prev, next) => next,
    default: () => "",
  }),
});

// langgraph 靠这个 route 值判断接下来跑 math 节点还是 chat 节点，决定走哪条工作流。
const router = (state) => {
  const isMath = /[+\-*/]/.test(state.query);
  return { route: isMath ? "math" : "chat" };
};

const mathNode = (state) => {
  try {
    return { answer: String(eval(state.query)) };
  } catch {
    return { answer: "表达式无法计算" };
  }
};

const chatNode = (state) => ({ answer: `你说的是：${state.query}` });

const graph = new StateGraph(StateAnnotation)
  .addNode("router", router)
  .addNode("math", mathNode)
  .addNode("chat", chatNode)
  .addEdge(START, "router")
  // router 节点跑完后，读取 state.route 的值做判断，
  // 值为 math 就跳 math 节点，值为 chat 就跳 chat 节点，
  // 实现分支跳转。
  .addConditionalEdges("router", (state) => state.route, {
    math: "math",
    chat: "chat",
  })
  .addEdge("math", END)
  .addEdge("chat", END)
  .compile();

// 导出为 Mermaid：可复制到 https://mermaid.live 或 Markdown 的 ```mermaid 代码块
const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({ withStyles: true });
console.log(mermaid);

console.log(
  "result:",
  await graph.invoke({ query: "你好" })
);

console.log(
    "result:",
    await graph.invoke({ query: "10 * 8" })
);