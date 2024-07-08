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