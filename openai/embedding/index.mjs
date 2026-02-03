import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:'https://api.302.ai/v1' // 
})
// client.completions.create() 文本生成
// client.chat.completions.create() 聊天与文本生成
// client.embeddings.create() 将文本转换为向量 语义搜索
// 你好 hello 一个意思
// 向量是一串数字，它通过在高维空间中的位置来表示词语或句子的“意思”，
// 因为语义相近的内容（比如“猫”和“狗”）会被模型映射到空间中彼此靠近的位置，
// 从而用距离远近反映语义相似性。
// 刘慈欣《三体Ⅲ：死神永生》中，高维文明通过“降维打击”将三维空间降至二维，
// 用“二向箔”使整个星系平面化，低维无法抵抗，实现毁灭性打击。
// 1536 维 
// ![](https://static001.geekbang.org/resource/image/32/7a/32db77431433da86d9f818037752bd7a.png?wh=1600x1320)
const response = await client.embeddings.create({
    // text-embedding-ada-002 是 OpenAI 推出的高效文本嵌入模型，
    // 能将任意文本转换为 1536 维的向量，广泛用于语义搜索
    model: "text-embedding-ada-002",
    input: "如何创建 Vue.js 组件"
})

console.log(response.data[0].embedding)