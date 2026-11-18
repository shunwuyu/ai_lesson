// main.js
import { chatRAG, addDoc } from "./layaDecisionRag.js";

async function main() {
  // 灌入测试知识库
  await addDoc("Laya System One 是快速决策模型，自托管部署，协议为 /v1/systemone");
  await addDoc("Laya 适合RAG前置路由，区分是否检索、是否改写query");
  await addDoc("Laya支持choice/noul/score三类决策输出，不做自由文本生成");

  console.log("=== 测试1：问候（direct_answer）===");
  console.log(await chatRAG("你好"));

  console.log("\n=== 测试2：需要检索 ===");
  console.log(await chatRAG("Laya System One 接口路径是什么？"));

  console.log("\n=== 测试3：模糊问题 ===");
  console.log(await chatRAG("这个模型是干嘛的？"));
}

main().catch(console.error);
