// mcp-server.js
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  CallToolResultSchema,
} from "@modelcontextprotocol/sdk/types.js";

// 1. 创建 MCP Server
const server = new Server(
  {
    name: "demo-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // 可以动态注册工具
    },
  }
);

// 2. 注册一个工具（比如：获取当前时间）
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "getTime") {
    return {
      content: [
        {
          type: "text",
          text: `当前时间是: ${new Date().toISOString()}`,
        },
      ],
    };
  }
  throw new Error("未知工具: " + request.params.name);
});

// 3. 启动 MCP Server
const transport = new StdioServerTransport();
server.connect(transport);
