// 加载 .env 环境变量文件，读取配置如模型名称、代理地址等
import 'dotenv/config'
// 导入 Neo4j 图谱封装类，用于连接 neo4j 数据库执行 cypher 查询
import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph'
// 导入 OpenAI 对话大模型封装
import { ChatOpenAI } from '@langchain/openai'
// LangGraph 核心：状态图、结束标记、起始标记
import { StateGraph, END, START } from '@langchain/langgraph'
// 人类消息对象，用来封装用户提问
import { HumanMessage } from '@langchain/core/messages'

// ======================================================
// 1. 建立 Neo4j 知识图谱连接实例
// ======================================================
const graph = new Neo4jGraph({
  url: 'bolt://localhost:7687', // neo4j bolt协议地址，本地默认端口7687
  username: 'neo4j',            // neo4j 默认用户名
  password: '12345678',         // neo4j 数据库密码，修改为你自己的密码
})

// ======================================================
// 2. 初始化大模型实例
// ======================================================
const llm = new ChatOpenAI({
  model: process.env.MODEL_NAME,       // 模型名称，从.env读取，如gpt‑4o / qwen等
  temperature: 0,                      // 温度0，输出确定性强，适合生成Cypher，减少随机
  configuration: { baseURL: process.env.OPENAI_BASE_URL } // 自定义接口地址，适配中转/国内大模型
})

// ======================================================
// 3. 定义 LangGraph 的状态（State）
// 整个工作流各个节点之间共享的数据容器
// ======================================================
const state = {
  // messages：消息历史数组
  // value: 归约函数，新消息追加到数组末尾，实现消息累加
  // default: 初始为空数组
  messages: {
    // 老版本用reducer, 新版本改成value 规约函数
    value: (left, right) =>
      left.concat(Array.isArray(right) ? right : [right]),
    default: () => [],
  },
  // Cypher 是 Neo4j 专属的声明式图查询语言，用类自然语句描述节点与关系，用来对图数据做增删改查。
  cypher: null,    // 保存大模型生成出来的 Cypher 查询语句
  // rag 
  context: null,   // 保存 neo4j 返回的图谱检索结果(json字符串)
  answer: null,    // 保存最终返回给用户的自然语言答案
}

/**
 * 工具函数：获取最新一条用户提问
 * @param state 当前工作流状态对象
 * @returns 用户问题文本
 */
function userQuery(state) {
  const last = state.messages[state.messages.length - 1]
  return last.content
}

// ======================================================
// 4. 节点1：根据用户问题生成 Neo4j Cypher 查询语句
// ======================================================
/**
 * LangGraph节点函数：生成Cypher
 * @param state 当前状态
 * @returns { cypher: string } 更新状态里的cypher字段
 */
async function generateCypher(state) {
  // Prompt：给大模型指令，约束节点、关系、方向、输出格式
  const prompt = `
      你是一个专业的 Neo4j Cypher 生成器。
      严格按照下面的结构生成正确语句，只返回纯 Cypher 代码，不要任何解释、不要标点、不要 markdown。
  
      节点：
      - Product: 奶茶产品
      - Ingredient: 配料
      - Type: 奶茶类型
      - Method: 制作工艺
      - People: 适合人群
  
      关系方向（必须严格遵守）：
      - (Product)-[:属于]->(Type)
      - (Product)-[:包含]->(Ingredient)
      - (Product)-[:适合]->(People)
      - (Ingredient)-[:使用]->(Method)
  
      规则：
      1. 关系方向绝对不能反
      2. 多跳查询请使用多个 MATCH，不要连错路径
      3. 只返回最终可运行的 Cypher 语句
  
      用户问题：${userQuery(state)}
    `
  // 调用大模型，传入提示词
  const res = await llm.invoke([new HumanMessage(prompt)])
  // 返回对象，会自动合并到全局state中，赋值cypher字段
  return { cypher: res.content }
}

// ======================================================
// 5. 节点2：执行 Cypher，查询 Neo4j 图谱
// ======================================================
/**
 * LangGraph节点函数：执行图谱查询
 * @param state 当前状态，读取state.cypher
 * @returns { context: string } 将查询结果存入context
 */
async function executeGraphQuery(state) {
  try {
    // 使用Neo4jGraph封装方法执行cypher，返回查询结果数组
    const res = await graph.query(state.cypher)
    // 将查询结果转为JSON字符串存入context，供后续大模型使用
    return { context: JSON.stringify(res) }
  } catch (e) {
    // Cypher语法错误、查询异常时，捕获异常，设置兜底上下文
    return { context: '未查询到相关知识' }
  }
}

// ======================================================
// 6. 节点3：根据图谱检索结果，生成自然语言答案
// ======================================================
/**
 * LangGraph节点函数：生成最终回答
 * @param state 当前状态，读取state.context检索结果
 * @returns { answer: string } 最终自然语言回答
 */
async function generateAnswer(state) {
  const prompt = `
    你是奶茶专家，根据下方「检索结果」回答用户问题；检索结果为空或不足时简要说明无法从图谱得到答案，不要编造。
    回答要求：
    - 直接列出事实，不要推断图谱里未出现的配料（如水、冰、添加剂等）。
    检索结果：${state.context}
    用户问题：${userQuery(state)}
  `
  const res = await llm.invoke([new HumanMessage(prompt)])
  return { answer: res.content }
}

// ======================================================
// 7. 组装 LangGraph 工作流
// 工作流顺序：START → generateCypher → executeGraph → generateAnswer → END
// ======================================================
// LangGraph 中状态的存储通道, 定义状态字段、读写规则，用来传递、持久化图流程里各节点间的数据。
// Annotation.Root
const workflow = new StateGraph({ channels: state })
  // 添加工作流节点，每个节点对应上面写好的异步函数
  .addNode('generateCypher', generateCypher)
  .addNode('executeGraph', executeGraphQuery)
  .addNode('generateAnswer', generateAnswer)
  // START：图的起点，流向生成Cypher节点
  .addEdge(START, 'generateCypher')
  // generateCypher执行完成，流向执行图谱查询节点
  .addEdge('generateCypher', 'executeGraph')
  // 图谱查询完成，流向生成自然语言答案节点
  .addEdge('executeGraph', 'generateAnswer')
  // 答案生成完毕，流向END结束整个工作流
  .addEdge('generateAnswer', END)

// 编译工作流，得到可执行的应用实例app
const app = workflow.compile()

/**
 * 打印工作流Mermaid流程图代码，可以复制到mermaid.live查看可视化流程图
 */
async function printWorkflowMermaid() {
  const drawable = await app.getGraphAsync()
  const mermaid = drawable.drawMermaid({ withStyles: true })
  console.log('--- LangGraph 工作流 (Mermaid) ---')
  console.log(mermaid)
  console.log('-----------------------------------------------------------')
}

// ======================================================
// 8. GraphRAG执行入口函数
// 传入用户问题，完整跑一遍整个工作流
// ======================================================
/**
 * @param question 用户提问文本
 */
async function runGraphRAG(question) {
  // invoke触发工作流执行，初始传入messages，放入用户提问
  const res = await app.invoke({
    messages: [new HumanMessage(question)],
  })
  // 控制台打印完整链路信息，方便调试
  console.log('======================================')
  console.log('用户问题：', question)
  console.log('生成 Cypher：', res.cypher)
  console.log('检索结果：', res.context)
  console.log('最终回答：', res.answer)
  console.log('======================================')
}

// ======================================================
// 9. 测试入口
// 打印流程图，并发执行3条测试query
// ======================================================
;(async () => {
  // 输出mermaid流程图代码
  await printWorkflowMermaid()
  // Promise.all并发跑多个测试样例
  await Promise.all([
    runGraphRAG('我们这款珍珠奶茶有哪些配料？'),
    // runGraphRAG('台式奶茶的饮品都有哪些配料？'),
    // runGraphRAG('珍珠奶茶适合哪些人群饮用？'),
  ])
})().catch(console.error) // 全局捕获异常打印错误
