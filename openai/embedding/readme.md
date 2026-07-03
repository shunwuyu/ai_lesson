- 所有前端内容有哪些
- python 相关内容

传统搜索靠关键词精准匹配，只比对字面文字，不懂语义，同义词、换种说法就搜不准，最终只返回文档列表，需要用户自己筛选整合。而RAG语义搜索是理解用户真实意图，通过向量嵌入捕捉语句深层含义，能识别同义、模糊提问。它不只是找文档，还会检索知识库内容并由大模型整合生成精准答案，解决了传统搜索语义盲区、适配自然语言提问，结果更智能、贴合需求。

需求：想找马铃薯的家常做法

传统搜索关键词：马铃薯家常做法 → 正常出菜谱
换同义词搜：土豆家常做法 不匹配

https://ninghao.net/video/9801

- embedding 测量文本的相关程度
- 语义搜索，聚类，推荐
- 文字转为数字来表示 ，计算机不理解 文本， 
- 向量 小数
- cosine similarity
- 向量数据库

1. 模拟请求
- POST https://api.gptsapi.net/v1/embeddings
    Content-Type application/json
    Authorization Bearer sk-WR039dc5929d38c0e9caa911fba9aa0968839a41489KzUET
    {
        "model":"text-embedding-ada-002",
        "input":"如何创建 Vue.js 组件"
    }

- sdk 调用
    - create-embedding.mjs


- semantic-search
    写一个node.js 命令行工具，用标准esm, 使用箭头函数，包含注释，程序提示用户输入要搜索的内容，回车以后执行一个任务，完成以后继续提示用户输入要搜索的内容