import 'dotenv/config';
import { ChatOpenAI } from'@langchain/openai';
import { z } from'zod';
import { StructuredOutputParser } from '@langchain/core/output_parsers';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const scientistSchema = z.object({
    name: z.string().describe("姓名"),
    birth_year: z.number().describe("出生年份"),
    death_year: z.number().describe("去世年份"),
    nationality: z.string().describe("国籍"),
    occupation: z.string().describe("职业"),
    famous_works: z.array(z.string()).describe("著名作品列表"),
    biography: z.string().describe("简短传记")
});

const modelWithTool = model.bindTools([
  {
    name: "extract_scientist_info",
    description: "提取和结构化科学家的详细信息",
    schema: scientistSchema
  }
])

console.log(`流式Tool Calls 演示`)

try {
    // 开启流式输出
    const stream = await modelWithTool.stream("详细介绍牛顿的生平和成就");

    console.log("🌊 实时输出流式 tool_calls_chunk:\n");

    let chunkIndex = 0;

    for await (const chunk of stream) {
        chunkIndex++;
        // 直接打印每个 chunk 的 tool_calls 信息
        if (chunk.tool_call_chunks && chunk.tool_call_chunks.length > 0) {
            // args 可能为 null(流结束时),需要兜底避免 write 抛错
            process.stdout.write(chunk.tool_call_chunks[0].args ?? '');
        }
    }

    console.log("\n\n✅ 流式输出完成");

} catch (error) {
    console.error("\n❌ 错误:", error.message);
    console.error(error);
}
