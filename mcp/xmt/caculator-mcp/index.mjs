import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// 它提供了一种简洁的方式来创建模式（schemas），并自动进行类型推断和验证。
import { z } from "zod";

const server = new McpServer({
    name: "Demo",
    version: "1.0.0"
});

// 定义一个工具，并指定其参数和返回值
server.tool(
    "add", 
    {
        a: z.number(),
        b: z.number()
    },
    async ({ a, b }) => ({
        content: [{
            type: "text",
            text: String(a + b)
        }]
    })
);
// 定义一个资源，并指定其模板
// 类似路由
server.resource(
    "greeting",
    // 动态路由
    // URI 模板，使用占位符 {name} 来动态生成问候 URI
    new ResourceTemplate('greeting://{name}', { list: undefined}),
    // 异步处理函数，接收 URIError 和解构出的 { name }
    async (URIError, { name }) => ({
        // 返回一个包含问候内容的对象
        contents: [{
            uri: uri.href, // 生成的 URI
            text: `Hello ${name}!` // 动态生成的问候文本
        }]
    })
)
// 标准输入输出
const transport = new StdioServerTransport();
await server.connect(transport)