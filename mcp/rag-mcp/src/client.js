// src/client.js;
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createClient() {
  const client = new Client({
    name: "Demo",
    version: "1.0.0",
  });

  const transport = new StdioClientTransport({
    command: "node",
    args: ["src/server.js"],
  });

  try {
    await client.connect(transport);
    console.log("Client connected successfully");
  } catch (err) {
    console.error("Client connection failed:", err);
    throw err;
  }

  // 可选：添加客户端方法调用后的调试
  return client;
}

