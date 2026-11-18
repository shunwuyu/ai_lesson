# config.py
import os

# Laya-System-One 模型服务地址（兼容openai协议）
BASE_URL = os.getenv("LAYA_SYSTEM_ONE_BASE_URL", "http://127.0.0.1:8000/v1")
API_KEY = os.getenv("LAYA_SYSTEM_ONE_API_KEY", "laya-key")

# 模型名称
DECISION_MODEL = "laya-system-one-decision"   # 决策路由小模型
GEN_MODEL = "laya-system-one-chat"            # 最终生成回答模型
EMBED_MODEL = "laya-system-one-embedding"     # 向量嵌入模型

# 向量库参数
TOP_K = 3
SIMILARITY_THRESHOLD = 0.65
