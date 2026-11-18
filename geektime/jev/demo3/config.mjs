// config.js
export const CONFIG = {
  // 你自己部署的 laya-system-one 服务地址
  LAYA_URL: "http://127.0.0.1:8080/v1/systemone",
  // 内网不开启鉴权：置空""；如果启动laya服务时设置了 --api-key，就填这里
  LAYA_TOKEN: "",

  // 后面用来回答的大模型（兼容openai，ollama/本地基座都可以）
  LLM_BASE_URL: "http://127.0.0.1:11434/v1",
  LLM_API_KEY: "ollama",
  LLM_MODEL: "qwen2:7b",

  // 向量库
  TOP_K: 3,
  SIM_THRESHOLD: 0.65,
  VECTOR_DB_PATH: "./knowledge_db"
};
