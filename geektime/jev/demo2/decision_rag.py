# decision_rag.py
from typing import Literal, List, Optional
from pydantic import BaseModel
from openai import OpenAI
import faiss
import numpy as np

from config import BASE_URL, API_KEY, DECISION_MODEL, GEN_MODEL, EMBED_MODEL, TOP_K, SIMILARITY_THRESHOLD

# 初始化 Laya-System-One 客户端（OpenAI兼容）
client = OpenAI(base_url=BASE_URL, api_key=API_KEY)

# ========== 决策模型输出结构 ==========
class DecisionOutput(BaseModel):
    action: Literal["direct_answer", "retrieve", "rewrite_query", "reject"]
    reason: str
    rewrite_query: Optional[str] = None
    direct_resp: Optional[str] = None

# ========== 向量库封装 ==========
class VectorStore:
    def __init__(self, dim: int = 1024):
        self.index = faiss.IndexFlatL2(dim)
        self.documents: List[str] = []

    def embed_text(self, text: str) -> np.ndarray:
        resp = client.embeddings.create(model=EMBED_MODEL, input=text)
        emb = resp.data[0].embedding
        return np.array(emb, dtype=np.float32)

    def add_doc(self, text: str):
        emb = self.embed_text(text)
        self.index.add(emb.reshape(1, -1))
        self.documents.append(text)

    def search(self, query: str):
        emb = self.embed_text(query)
        D, I = self.index.search(emb.reshape(1, -1), TOP_K)
        results = []
        for dist, idx in zip(D[0], I[0]):
            if idx < len(self.documents) and dist < (1 - SIMILARITY_THRESHOLD):
                results.append(self.documents[idx])
        return results

# ========== 决策RAG核心 ==========
class LayaDecisionRAG:
    def __init__(self):
        self.vs = VectorStore()
        self.decision_prompt = """
你是一个RAG决策路由模型，基于用户问题判断执行动作，严格输出JSON，不要额外解释。
可选动作：
1. direct_answer：常识类、问候类、和知识库无关，可以直接回答
2. retrieve：需要查询知识库才能回答
3. rewrite_query：问题模糊，需要改写query再检索
4. reject：违规、无法回答的问题

输出JSON字段：
{
  "action": "",
  "reason": "",
  "rewrite_query": "",
  "direct_resp": ""
}
"""

    def run_decision(self, user_query: str) -> DecisionOutput:
        """调用 laya-system-one 决策模型做路由判断"""
        resp = client.chat.completions.create(
            model=DECISION_MODEL,
            messages=[
                {"role": "system", "content": self.decision_prompt},
                {"role": "user", "content": f"用户问题：{user_query}"}
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        return DecisionOutput.model_validate_json(resp.choices[0].message.content)

    def generate_answer(self, query: str, context: List[str]) -> str:
        """检索到上下文后，调用生成模型回答"""
        context_str = "\n---\n".join(context)
        prompt = f"""
基于下面知识库内容回答用户问题，不知道就说不知道，不要编造。
知识库：
{context_str}

用户问题：{query}
"""
        resp = client.chat.completions.create(
            model=GEN_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        return resp.choices[0].message.content

    def chat(self, user_query: str) -> str:
        decision = self.run_decision(user_query)
        print(f"[决策模型] 动作：{decision.action}，原因：{decision.reason}")

        if decision.action == "direct_answer":
            return decision.direct_resp
        elif decision.action == "reject":
            return "抱歉，该问题无法回答。"
        elif decision.action == "rewrite_query":
            new_q = decision.rewrite_query
            print(f"[改写Query] {new_q}")
            docs = self.vs.search(new_q)
            if not docs:
                return "知识库中没有相关信息。"
            return self.generate_answer(new_q, docs)
        elif decision.action == "retrieve":
            docs = self.vs.search(user_query)
            if not docs:
                return "知识库中没有相关信息。"
            return self.generate_answer(user_query, docs)
        else:
            return "未知动作"
