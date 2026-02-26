import 'dotenv/config';
// adpter 是适配器，将mcp server 的工具适配成langchain 的工具
// 万能遥控器
import { MultiServerMCPClient } from'@langchain/mcp-adapters';
import { ChatOpenAI } from'@langchain/openai';
import chalk from'chalk';
import { HumanMessage, SystemMessage, ToolMessage } from'@langchain/core/messages';

const model = new ChatOpenAI({ 
    modelName: "qwen-plus",
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
    },
});

const mcpClient = new MultiServerMCPClient({
    mcpServers: {
        // http 远程访问
        "amap-maps-streamableHTTP": {
            "url": "https://mcp.amap.com/mcp?key=" + process.env.AMAP_MAPS_API_KEY
        },
        // stdio 本地访问
        // "amap-maps": {
        //     "command": "npx",
        //     "args": [
        //         "-y",
        //         "@amap/amap-maps-mcp-server"
        //     ],
        //     "env": {
        //         "AMAP_MAPS_API_KEY": process.env.AMAP_MAPS_API_KEY
        //     }
        // },
        "filesystem": {
            "command": "npx",
            "args": [
                "-y",
                "@modelcontextprotocol/server-filesystem",
                // 授权根目录：必须是本机真实存在且可访问的路径，否则会 Error
                '/Users/shunwuyu/Desktop'  // 当前工作目录（运行 node 的目录），或改成绝对路径如 "/Users/shunwuyu/workspace/lesson/ai_lesson/guang/05/mcp-test"
            ]
        },
        "chrome-devtools": {
            "command": "npx",
            "args": [
                "-y",
                "chrome-devtools-mcp@latest"
            ]
        }
    }
});
console.log(mcpClient);
// 获取MCP Server 的工具
const tools = await mcpClient.getTools();
// 将工具绑定给模型
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
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
                // 一般我们写 tool 都是直接返回字符串，但是 FileSystem MCP 
                // 封装的这些 tool 返回的是对象，有 text 属性，所以要处理下：
                const toolResult = await foundTool.invoke(toolCall.args);
                let contentStr;
                if (typeof toolResult === 'string') {
                    contentStr = toolResult;
                } else if (toolResult && toolResult.text) {
                    contentStr = toolResult.text;
                }
                messages.push(new ToolMessage({
                    content: contentStr,
                    tool_call_id: toolCall.id,
                }));
            }
        }
    }

    return messages[messages.length - 1].content;
}


// await runAgentWithTools("北京南站附近的酒店，以及去的路线");
// await runAgentWithTools("北京南站附近的2个酒店，以及去的路线，路线规划生成文档保存到 /Users/shunwuyu/Desktop 的一个 md 文件");
await runAgentWithTools("北京南站附近的酒店，最近的 3 个酒店，拿到酒店图片，打开浏览器，展示每个酒店的图片，每个 tab 一个 url 展示，并且在把那个页面标题改为酒店名");
await mcpClient.close();