import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import {
    HumanMessage,
    SystemMessage,
    ToolMessage,
} from '@langchain/core/messages';
import fs from 'node:fs/promises';
// Zod 就是用来检查数据对不对的工具。
import { z } from 'zod';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME || 'qwen-coder-turbo',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const readFileTool = tool(
    async ({ file_path }) => {
        const content = await fs.readFile(file_path, 'utf-8');
        console.log(` [工具调用] read_file("${file_path}") - 成功获取 ${content.length} 字节`);
        return `文件内容：\n${content}`;
    },
    {   
        // Zod 在这里就是管参数的
        // Zod 会明确告诉你哪个字段错了、期望是什么、实际是什么，方便你快速定位问题。
        name: 'read_file',
        description: '用此工具来读取文件内容，当用户读取文件、查看代码、分析文件内容时，调用此工具。输入文件路径（可以是相对路径或绝对路径）。',
        schema: z.object({
            file_path: z.string().describe('文件路径'),
        }),
    },
)

const tools = [
    readFileTool,
]

const modelWithTools = model.bindTools(tools);

const messages = [
    new SystemMessage(`
    你是一个代码助手，可以使用工具读取文件并解释代码。

    工作流程：
    1. 用户要求读取文件时，立即调用 read_file 工具
    2. 等待工具返回文件内容
    3. 基于文件内容进行分析和解释

    可用工具：
    - read_file: 读取文件内容（使用此工具来获取文件内容）    
    `),
    new HumanMessage('请读取 src/tool-file-read.mjs 文件内容并解释代码')
]

let response = await modelWithTools.invoke(messages);
console.log(response);
messages.push(response);

while (response.tool_calls && response.tool_calls.length > 0) {
    console.log(`\n[检测到 ${response.tool_calls.length} 个工具调用]`);

    // 执行所有工具调用
    const toolResults = await Promise.all(
        response.tool_calls.map(async (toolCall) => {
            const tool = tools.find(t => t.name === toolCall.name);  // 查找工具
            if (!tool) {
                return `错误：找不到工具 ${toolCall.name}`;
            }

            console.log(`  [执行工具] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);
            try {
                const result = await tool.invoke(toolCall.args);  // 调用
                return result;
            } catch (error) {
                return `错误：${error.message}`;
            }
        })
    );

    response.tool_calls.forEach((toolCall, index) => {
        messages.push(
            new ToolMessage({
                content: toolResults[index],
                // AI 需要根据这个 ID 把工具的执行结果“回填”到正确的上下文位置，这样它才能基于准确的信息继续回答问题。
                tool_call_id: toolCall.id,
            })
        )
    });

    response = await modelWithTools.invoke(messages);
    console.log(response);
    messages.push(response);
}

console.log('\n[最终回复]');
console.log(response.content);
// console.log(JSON.stringify(messages, null, 2));
