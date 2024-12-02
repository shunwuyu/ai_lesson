# 向量数据库
import chromadb
# Settings 配置
from chromadb.config import Settings
# 生成器嵌入 图像处 自然语言处理
# from FlagEmbedding import BGEM3FlagModel
import ollama

chroma_client = chromadb.PersistentClient(path="./chromadb")
# document, metadata embedding
documents = [
  {
        "page_content": "合同是两方或多方之间的法律协议，通常包括各方的权利和义务。合同必须具备合法性和可执行性。",
        "metadata": {"id": "doc1"}
    },
    {
        "page_content": "在合同中，主要义务包括：1) 付款义务，2) 商品交付义务，3) 相关服务的提供。合同中的这些义务必须在约定的时间内履行。",
        "metadata": {"id": "doc2"}
    },
    {
        "page_content": "合同的解除通常需要双方的同意，或者由于法律规定的特殊情况，如违约或不可抗力事件。",
        "metadata": {"id": "doc3"}
    },
    {
        "page_content": "违约责任是指一方未能履行合同义务时，应承担的法律后果，通常包括赔偿损失和继续履行合同的责任。",
        "metadata": {"id": "doc4"}
    },
    {
        "page_content": "在合同生效之前，所有相关方必须理解合同条款，并同意其内容。签字是合同生效的重要标志。",
        "metadata": {"id": "doc5"}
    },
    {
        "page_content": "合约的履行必须符合诚信原则，即各方应诚实守信地履行自己的义务，并尊重对方的合法权益。",
        "metadata": {"id": "doc6"}
    },
    {
        "page_content": "在合同争议中，双方可通过调解、仲裁或诉讼的方式解决争端。选择合适的方式取决于争议的性质及金额。",
        "metadata": {"id": "doc7"}
    },
    {
        "page_content": "关于合同的法律法规各国有所不同，了解适用的法律条款是签订合同前的重要步骤。",
        "metadata": {"id": "doc8"}
    }
]

documentation_collection = chroma_client.get_or_create_collection(name="legal_docs")

for doc in documents:
  embedding = ollama.embeddings(model='nomic-embed-text:latest',prompt=doc['page_content'])
  # print(embedding.get('embedding'))
  # id, embedding, 原内容
  documentation_collection.add(
    ids=[doc['metadata']['id']],
    embeddings=embedding.get('embeddings'),
    documents=[doc['page_content']]
  )

query = "合同是什么？"
query_embedding = ollama.embeddings(model='nomic-embed-text:latest', prompt=query)
query_embedding = query_embedding.get('embedding')[:384] 
# print(query_embedding.get())
# # # 根据embedding 查询
results = documentation_collection.query(
  query_embeddings = query_embedding,
  n_results=1
)
# # # # 取出原内容
data = results['documents'][0]
document_content = data

prompt = f"根据一下信息， 请回答：{query}"

output = ollama.chat(model='qwen2.5:latest', messages=[
  {
    'role': 'user',
    'content': f"使用一下数据：{document_content},响应这个提示：{prompt}"
  }
])

print("生成的结果：", output['message']['content'])