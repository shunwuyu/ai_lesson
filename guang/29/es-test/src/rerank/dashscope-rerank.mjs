import "dotenv/config";
// `BaseDocumentCompressor` 是 LangChain 核心包中**文档压缩器的抽象基类**，
// 用于定义检索后对文档列表做过滤 / 精简压缩的统一接口。
import { BaseDocumentCompressor } from "@langchain/core/retrievers/document_compressors";
// RAG 召回的文档很多，压缩就是**筛掉无关文档**，减少传给大模型的上下文，省 token 还降低干扰，回答更准。
// 导入LangChain文档压缩器抽象基类，继承它来实现自定义rerank压缩器

/**
 * 通义千问DashScope重排序实现类
 * 继承BaseDocumentCompressor，作为LangChain RAG链路里的文档压缩器
 * 作用：对检索召回的文档列表，调用qwen3-rerank重排接口，按查询相关性重新筛选文档
 */
export class DashScopeRerank extends BaseDocumentCompressor {
  /**
   * 构造函数：初始化重排实例配置
   * @param apiKey DashScope API密钥
   * @param model 重排模型名称，默认 qwen3-rerank
   * @param topN 重排后保留相关性最高的文档数量，默认3条
   * @param baseUrl rerank接口地址，优先传入值，取不到则读取环境变量 RERANK_URL
   */
  constructor({ apiKey, model = "qwen3-rerank", topN = 3, baseUrl } = {}) {
    // 调用父类BaseDocumentCompressor构造方法
    super();
    this.apiKey = apiKey;
    this.model = model;
    this.topN = topN;
    // 接口地址优先级：传入参数 > 环境变量 RERANK_URL
    this.baseUrl = baseUrl ?? process.env.RERANK_URL;
  }

  /**
   * 实现父类抽象方法：compressDocuments，LangChain规定的文档压缩入口
   * @param documents 原始检索得到的Document文档数组
   * @param query 用户查询问题
   * @param _callbacks LangChain回调钩子（这里暂时未使用，加下划线标识未用到）
   * @returns 重排筛选后的文档数组，按相关性从高到低排序
   */
  async compressDocuments(documents, query, _callbacks) {
    // 请求DashScope rerank接口
    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        // Bearer鉴权，DashScope标准认证方式
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      // 组装请求体：compatible-api/v1/reranks 要求扁平结构，query/documents/top_n 与 model 同层
      body: JSON.stringify({
        model: this.model,
        query, // 用户提问
        // 提取LangChain文档对象里的文本内容pageContent，传给rerank模型
        documents: documents.map((d) => d.pageContent),
        top_n: this.topN, // 指定只返回topN个最相关文档
      }),
    });

    // 解析接口返回JSON
    const json = await res.json();

    // HTTP状态码非2xx，抛出异常，携带状态码和返回信息方便排查
    if (!res.ok) {
      throw new Error(`DashScope rerank ${res.status}: ${JSON.stringify(json)}`);
    }

    // 取出重排结果数组，每个元素包含原文档index、相关性score（compatible 接口 results 直接位于响应顶层）
    const results = json?.results;

    // 校验返回结果格式，不是数组直接抛错，防止后续map报错
    if (!Array.isArray(results)) {
      throw new Error(`unexpected rerank response: ${JSON.stringify(json)}`);
    }

    // 根据接口返回的文档索引，从原始documents取出对应文档，按rerank排序结果返回
    return results.map((item) => documents[item.index]);
  }
}

