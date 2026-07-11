import 'dotenv/config';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import chalk from 'chalk';
import { HumanMessage, SystemMessage, ToolMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME || 'deepseek-v4-flash',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        'my-mcp-server': {
            command: "node",
            args: [
                "/Users/shunwuyu/workspace/lesson/ai_lesson/guang/04/tool-test/my-mcp-server.mjs"
            ]
        }
    }
});

const tools = await mcpClient.getTools();
const modelWithTools = model.bindTools(tools);

const res = await mcpClient.listResources();
console.log(res, '////////');
let resourceContent = '';
for (const [serverName, resources] of Object.entries(res)) {
    for (const resource of resources) {
        const content = await mcpClient.readResource(serverName, resource.uri);
        resourceContent += content[0].text;
    }
}

console.log(resourceContent, '////////');




async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
        // new SystemMessage(resourceContent),
        new HumanMessage(query)
    ];

    for (let i = 0; i < maxIterations; i++) {
        console.log(chalk.bgGreen(`⏳ 正在等待 AI 思考...`));
        const response = await modelWithTools.invoke(messages);
        messages.push(response);

        // 检查是否有工具调用
        if (!response.tool_calls || response.tool_calls.length === 0) {
            console.log(`\n✨ AI 最终回复:\n${response.content}\n`);
            return response.content;
        }

        console.log(chalk.bgBlue(`🔍 检测到 ${response.tool_calls.length} 个工具调用`));
        console.log(chalk.bgBlue(`🔍 工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`));
        // 执行工具调用
        for (const toolCall of response.tool_calls) {
            const foundTool = tools.find(t => t.name === toolCall.name);
            if (foundTool) {
                const toolResult = await foundTool.invoke(toolCall.args);
                messages.push(new ToolMessage({
                    content: toolResult,
                    tool_call_id: toolCall.id,
                }));
            }
        }
    }
    // 循环达最大次数 30 次仍无最终回答，返回最后一轮 AI 输出兜底。
    // 若最后一轮 AI 只返回 tool_calls 无文本 content，content为空字符串。
    return messages[messages.length - 1].content;
}


// await runAgentWithTools("查一下用户 002 的信息");
// await runAgentWithTools("MCP Server 的使用指南是什么");
// 关闭所有 MCP 子进程与通信通道，释放进程资源。
// 关闭和 MCP Server 的通信通道
// 结束 my-mcp-server.mjs 这个被启动出来的子进程
// 释放相关资源，避免脚本一直挂着不退出
// langchain-mcp-test.mjs
//   -> 启动一个 node 子进程
//   -> 子进程运行 my-mcp-server.mjs
//   -> 主进程通过 stdio 跟它对话
//   -> close() 时把这个连接和子进程一起关掉
await mcpClient.close();