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


