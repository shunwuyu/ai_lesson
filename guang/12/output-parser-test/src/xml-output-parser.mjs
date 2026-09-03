import 'dotenv/config';
import { ChatOpenAI } from'@langchain/openai';
import { XMLOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const parser = new XMLOutputParser();

const question = `请提取以下文本中的人物信息: 阿尔伯特·爱因斯坦出生于 1879 年, 是一位伟大的物理学家。
${parser.getFormatInstructions()}`;

console.log('question:', question);

try {
    console.log("🤔 正在调用大模型 (using XMLOutputParser) ...\n");

    const response = await model.invoke(question);

    console.log("📩 模型原始响应:\n");
    console.log(response.content);

    const result = await parser.parse(response.content);

    console.log("\n✅ XMLOutputParser 自动解析的结果:\n");
    console.log(result);
} catch (error) {
    console.error("\n❌ 错误:", error.message);
    console.error(error);
}
