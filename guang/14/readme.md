# Prompt Template：组件化管理 prompt

prompt 毫无疑问是 AI Agent 中最核心的部分。
我们调用大模型完成各种功能，都是在 prompt 里描述的。

而且类似 RAG 查询向量数据库，查到的文档也是放在 prompt 里给到大模型。

但这节不讲 prompt 怎么写，因为在公司里有专门的产品部门负责写 prompt，我们要学的是如何管理它。

比如 prompt 之间的组合，prompt 里的示例的管理等。

之前都是直接写字符串：

现在都是一整个的 prompt，实际上可能需要按照角色、背景、任务、格式等来拆分管理 prompt，这样用的时候再组合。

