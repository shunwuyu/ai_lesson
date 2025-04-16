
⌘K to generate a command
568465684+45457878等于多少？

{
    "mcpServers": {
      "calculator-mcp": {
        "command": "node",
        "args": [
            "/Users/shunwuyu/workspace/lesson/ai_lesson/mcp/xmt/mcp-client/index.mjs"
        ]
      }
    }
  }



  import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "Calculator",
    version: "1.0.0"
});

server.tool(
    "add", 
    {
        a: z.number(),
        b: z.number()
    },
    async ({ a, b }) => ({
        contents: [{  // 注意这里是 contents 而不是 content
            type: "text",
            text: String(a + b)
        }]
    })
);

const transport = new StdioServerTransport();
await server.connect(transport);