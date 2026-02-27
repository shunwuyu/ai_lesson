# 知识库的 loader 和 splitter：从各种来源加载文档并分割成小块

- RAG 解决了什么问题？

大模型的幻觉问题。

幻觉就是大模型对于它不知道的知识，会以为自己知道，然后胡乱回答。

- 怎么解决的？

解决方案 RAG 就是根据用户的 prompt，去知识库查询相关文档，加到 prompt 里给到大模型作为背景知识来回答。

- 流程

这种相关文档的检索，要根据 prompt 的语义来搜，所以一般要结合向量来实现：基于嵌入模型把文档向量化，存入向量数据库，查询的时候把 prompt 向量化，根据余弦相似度，来检索最相近的向量，然后把相关文档放到 prompt 里。

- 知识的来源

一个 word 文档、一个 pdf 文件、一个 youtube 视频、一个 url、一个 x 的推文等。

这种显然就不是直接创建 Document 对象了，而是要用各种 loader 来转换：

.stylus  -> css  loader

经过对应的 loader 处理后，变成 Document，之后再由嵌入模型向量化后存入知识库。

知识有各种来源，所以对应的各种 loader 也很多：

https://docs.langchain.com/oss/python/integrations/document_loaders

现在 langchain 文档里有 180+ loader：

- PyPDFLoader
    专为处理 PDF 文件 设计，默认将 PDF 的每一页自动切分为一个独立的 Document 对象，是构建企业知识库最常用的加载器。

- WebBaseLoader

    用于从 网页 URL 抓取内容，能自动提取 HTML 中的正文文本并去除导航栏、广告等噪音，适合让 AI 学习最新的网络资讯。

- CSVLoader
    专门解析 CSV 表格数据，默认将每一行数据转换成一个 Document（通常以“列名: 值”的格式组合成文本），适合处理结构化数据问答。

- TextLoader

    最基础的加载器，用于读取 纯文本文件 (.txt)，通常用于加载已经预处理好的文本或简单的笔记文件，支持自定义编码格式。


你可以把各种知识来源通过 loader 转化为文档存入知识库。当然，有的文档可能会很大，比如一个 pdf 文件可能是一本书的大小。这种很明显不能直接把转化后的 Document 向量化，需要先拆分文档。也就是需要 Splitter


大的文档经过 TextSplitter 分割后，变成一个个小文档，再给到嵌入模型做向量化。分割最简单的就是按照字符，比如换行符 \n但并不是每一行一个 Document，而是要设置一个 chunk size，按照换行符分割好的内容加入到这个 Chunk，当达到 chunk size 后，再继续生成下个 Chunk。



这个 Chunk 也是 Document 对象，只是文档内容是分割好的一个个大小合适的块。我们写代码来跑一边这个流程。



