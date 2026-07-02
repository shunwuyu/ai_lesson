import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";

// 1. init MCP server
const server = new Server(
  { name: "simple-read-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. register tools list
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "read_file",
      description: "读取指定路径的本地文件内容",
      inputSchema: {
        type: "object",
        properties: {
          path: { type: "string", description: "文件的绝对或相对路径" },
        },
        required: ["path"],
      },
    },
  ],
}));

// 3. handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "read_file") {
    try {
      const content = await fs.readFile(args.path, "utf-8");
      return {
        content: [{ type: "text", text: content }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `读取文件失败: ${error.message}` }],
        isError: true,
      };
    }
  }

  throw new Error(`未知工具: ${name}`);
});

// 4. start server via Stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();