import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Create an MCP server
const server = new McpServer({
    name: "Achievement",
    version: "1.0.0"
});

server.tool("get_score_by_name", {name: z.string}, ({name}) => {
    if(name === "张三") {
        return "name: 张三 绩效评分: 85.9"
    } else if (name === "李四") {
        return "name: 李四 绩效评分: 92.7"
    } else {
        return "未搜到该员工的绩效"
    }
})


const transport = new StdioServerTransport();
await server.connect(transport);
