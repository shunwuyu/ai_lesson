import {  BaseRetriever, Doc } from "@langchain/core/retrievers";

// 定义一个简单的文档类
class SimpleDoc implements Doc {
  pageContent: string;
  // 媒体信息
  metadata: Record<string, any>;

  constructor(pageContent: string, metadata: Record<string, any> = {}) {
    this.pageContent = pageContent;
    this.metadata = metadata;
  }
}

// 创建一个自定义的检索器
class CustomRetriever extends BaseRetriever {
  private documents: Doc[];

  constructor(documents: Doc[]) {
    super();
    this.documents = documents;
  }

  async getRelevantDocuments(query: string): Promise<Doc[]> {
    // 简单的匹配逻辑：返回包含查询字符串的文档
    return this.documents.filter(doc => doc.pageContent.includes(query));
  }
}

// 创建一些示例文档
const documents = [
  new SimpleDoc("This is the first document.", { source: "file1.txt" }),
  new SimpleDoc("This is the second document.", { source: "file2.txt" }),
  new SimpleDoc("This is the third document.", { source: "file3.txt" })
];

// 创建自定义检索器实例
const retriever = new CustomRetriever(documents);

// 使用检索器检索相关文档
const query = "second";
retriever.getRelevantDocuments(query).then(relevantDocs => {
  relevantDocs.forEach(doc => {
    console.log(doc.pageContent);
  });
});