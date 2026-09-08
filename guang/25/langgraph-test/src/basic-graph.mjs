import "dotenv/config";
import { 
  Annotation, // 好比表格表头 哪些字段、是什么类型， 节点的输入
  END,  // 结束节点
  START,  // 开始节点
  StateGraph  // 流程编排器 节点的组织
} from "@langchain/langgraph";

//Annotation 用于创建State, 指定默认值和合并逻辑(reducer)
// Annotation.Root 状态模板
// text 默认值是空字符串 ，每次更新直接用新值覆盖旧的，不理会上一轮老数据。
const StateAnnotation = Annotation.Root({
  text: Annotation({ // 
    reducer: (_prev, next) => next, // 
    default: () => "",
  }),
});

const step1 = (state) => ({ text: `${state.text} -> step1` }); // 节点1
const step2 = (state) => ({ text: `${state.text} -> step2` }); // 节点2
// 创建StateGraph 图
// StateGraph 接收 StateAnnotation 
// 拿到状态字段、合并与默认规则，以此约束所有节点的输入输出数据结构。
const graph = new StateGraph(StateAnnotation)
  // 先申明所有节点， 才能连上
  // 添加两个节点
  .addNode("step1", step1)
  .addNode("step2", step2)
  // 用边连接节点
  .addEdge(START, "step1")
  .addEdge("step1", "step2")
  .addEdge("step2", END)
  // 编译后执行
  .compile();

// 导出为 Mermaid：可复制到 https://mermaid.live 或 Markdown 的 ```mermaid 代码块
// **文本画图工具**，写简单 Markdown 一样的代码，就能自动生成流程图、时序图、甘特图，不用拖拽画图软件
// 方便可视化看整个节点流转关系
const drawable = await graph.getGraphAsync();
const mermaid = drawable.drawMermaid({ withStyles: true });
console.log(mermaid);

const result = await graph.invoke({ text: "hello" });
console.log("result:", result);
