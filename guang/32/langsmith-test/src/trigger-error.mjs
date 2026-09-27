import "dotenv/config";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";

/**
 * 故意在图节点里抛错，用于验证 LangSmith / 本地日志是否能看到失败 run。
 * 运行: node src/trigger-error.mjs
 *
 * 若需要「未捕获的 Promise rejection」观察进程行为，可删掉下方 try/catch,
 * 仅保留 await graph.invoke(...).
 */
const StateAnnotation = Annotation.Root({
  text: Annotation({
    reducer: (_prev, next) => next,
    default: () => "",
  }),
});

const stepOk = (state) => ({ text: `${state.text}[ok]` });

const stepThrow = () => {
  throw new Error("DemoError: 节点内故意抛错 (trigger-error.mjs) ");
};

const graph = new StateGraph(StateAnnotation)
  .addNode("step_ok", stepOk)
  .addNode("step_throw", stepThrow)
  .addEdge(START, "step_ok")
  .addEdge("step_ok", "step_throw")
  .addEdge("step_throw", END)
  .compile();

try {
  await graph.invoke({ text: "start" });
  console.log("不应执行到这里");
} catch (err) {
  console.error("已捕获:", err?.message ?? err);
  process.exitCode = 1;
}
