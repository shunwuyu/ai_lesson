import { Annotation, END, MemorySaver, START, StateGraph } from "@langchain/langgraph";
// Annotation 用于创建State, 指定默认值和合并逻辑(reducer)
// Annotation.Root 状态模板
const StateAnnotation = Annotation.Root({
  // 尝试次数
  tries: Annotation({
    reducer: (_prev, next) => next,
    default: () => 0,
  }),
  // 是否成功
  ok: Annotation({
    reducer: (_prev, next) => next,
    default: () => false,
  }),
  // 提示信息
  message: Annotation({
    reducer: (_prev, next) => next,
    default: () => "",
  }),
});
// attempt 节点用于模拟重试操作，尝试次数超过 3 次后，成功返回 true。
const attempt = (state) => {
  const tries = state.tries + 1;
  const ok = tries >= 3;
  return {
    tries,
    ok,
    message: ok ? `第 ${tries} 次成功` : `第 ${tries} 次失败，继续重试`,
  };
};

const graph = new StateGraph(StateAnnotation)
  .addNode("attempt", attempt)
  .addEdge(START, "attempt")
  // attempt 节点跑完后，读取 state.ok 的值做判断，
  // 值为 true 就跳 done 节点，值为 false 就跳 retry 节点，
  // 实现循环跳转。
  .addConditionalEdges("attempt", (state) => (state.ok ? "done" : "retry"), {
    retry: "attempt",
    done: END,
  })
  .compile();

// 导出为 Mermaid：可复制到 https://mermaid.live 或 Markdown 的 ```mermaid 代码块
const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({ withStyles: true });
console.log(mermaid);

const result = await graph.invoke({ tries: 0 });
console.log("result:", result);
