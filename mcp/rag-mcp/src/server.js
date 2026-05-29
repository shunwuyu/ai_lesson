import {
    McpServer,
    ResourceTemplate,
  } from "@modelcontextprotocol/sdk/server/mcp.js";
  import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
  import { z } from "zod";
  
  const facts = [
    "公理1: 生存是文明的第一需要.",
    "公理2: 文明不断增长和扩张，但宇宙中的物质总量保持不变.",
  ].map((f) => f.toLowerCase());
  
  const server = new McpServer({
    name: "mcp-cli-server",
    version: "1.0.0",
  });
  
  // 使用 Zod 定义工具的输入模式
  server.tool(
    "search_local_database",
    z.object({ query: z.string() }),
    async ({ query }) => {
      console.log("Tool called with query:", query);
      const queryTerms = query.toLowerCase().split(/\s+/);
      const results = facts.filter((fact) =>
        queryTerms.some((term) => fact.includes(term))
      );
      return {
        content: [
          {
            type: "text",
            text: results.length === 0 ? "未找到相关公理" : results.join("\n"),
          },
        ],
      };
    }
  );

  server.tool(
    "add", 
    {
        a: z.number(),
        b: z.number()
    },
    async ({ a, b }) => ({
        contents: [{  // 注意这里是 contents 而不是 content
            type: "text",
            text: String(a + b) + "haha"
        }]
    })
);

  
  // 定义资源
  server.resource(
    "current_time",
    new ResourceTemplate("time://current", { list: undefined }),
    async (uri) => ({
      contents: [{ uri: uri.href, text: new Date().toLocaleString() }],
    })
  );
  
  await server.connect(new StdioServerTransport());
  console.log("Server is running...");
  