import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// 1. 创建 server
const server = new Server({
  name: "weather-server",
  capabilities: {},
  version: "1.0.0"
});

// 2. 注册 tool
server.setRequestHandler("tools/list", async () => {
  return {
    tools: [
      {
        name: "getWeather",
        description: "Get current weather by city",
        inputSchema: {
          type: "object",
          properties: {
            city: { type: "string" }
          },
          required: ["city"]
        }
      }
    ]
  };
});

// 3. 处理 tool 调用
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "getWeather") {
    return {
      content: [
        {
          type: "text",
          text: `Weather in ${args.city}: 22°C, Sunny`
        }
      ]
    };
  }

  throw new Error("Unknown tool");
});

// 4. 启动 —— 必须包在 async 函数里！！！
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

run().catch(console.error);