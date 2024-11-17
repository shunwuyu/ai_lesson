# 向量数据库
import chromadb
# langchain 一样 单独的索引对象
from llama_index.core import PromptTemplate, Settings, SimpleDirectoryReader, StorageContext, VectorStoreIndex
from llama_index.core.node_parser import SentenceSplitter
#embedding 库
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama
# 向量存储桥接
from llama_index.vector_stores.chroma import ChromaVectorStore

file_directory = "./data/a.txt"

llm = Ollama(model="llama3.2:latest", request_timeout=300.0)
# 下载模型
embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
Settings.llm = llm
Settings.embed_model = embed_model
# 按目录读取
documents = SimpleDirectoryReader(input_files=[file_directory]).load_data()
# 临时的 Chroma 客户端实例 Ephemeral 短暂的
chroma_client= chromadb.EphemeralClient()
chroma_collection = chroma_client.create_collection("ollama")
vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)
# 向量存储索引
index = VectorStoreIndex.from_documents( 
  documents, 
  storage_context=storage_context, 
  embed_model=embed_model, 
  # 文档预处理
  transformations=[SentenceSplitter(chunk_size=256, chunk_overlap=10)]
)

qa_template = PromptTemplate(
  "急于提供的上下文: \n"
  "----------------------------------\n"
  "{context_str}\n"
  "----------------------------------\n"
  "请回答一下问题：\n"
  "问题：{query_str} \n\n"
  "答案："
)
# 查询引擎
# 向量索引 -> 查询引擎 -> query 
query_engine = index.as_query_engine(
  text_qa_template = qa_template, 
  similarity_top_k=3
)

query = "什么是作用域？"
response = query_engine.query(query)
print(response.response)


