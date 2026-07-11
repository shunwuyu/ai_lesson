// query_user 的工具供 AI 查询模拟数据库中的用户详细信息，并附带一份使用指南资源。
// Client/Server 客户端/服务端 通信， 
// MCP 服务器 用于定义服务器信息、注册工具（Tools）和资源（Resources）
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// 标准输入输出流 通信
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
// 数据校验 zod tool parameter 校验
import { z } from 'zod';

// 模拟数据库
const database = {
  users: {
    '001': { id: '001', name: '张三', email: 'zhangsan@example.com', role: 'admin' },
    '002': { id: '002', name: '李四', email: 'lisi@example.com', role: 'user' },
    '003': { id: '003', name: '王五', email: 'wangwu@example.com', role: 'user' },
  }
};

const server = new McpServer({
  name: 'my-mcp-server',
  version: '1.0.0',
});

// 修复 registerTool 多余闭合括号
server.registerTool('query_user', {
  description: '查询数据库中的用户信息。输入用户 ID，返回该用户的详细信息（姓名、邮箱、角色）。',
  inputSchema: {
    userId: z.string().describe('用户 ID，例如: 001, 002, 003'),
  }
}, async ({ userId }) => {
  const user = database.users[userId];
  if (!user) {
    return {
      content: [
        {
          type: 'text',
          text: `用户 ID ${userId} 不存在。可用的 ID: 001, 002, 003`,
        },
      ],
    };
  }
  return {
    content: [
      {
        type: 'text',
        text: `用户信息：\n- ID: ${user.id}\n- 姓名: ${user.name}\n- 邮箱: ${user.email}\n- 角色: ${user.role}`,
      },
    ],
  };
});
// MCP Server 的使用指南是什么？
// 修复 registerResource 参数顺序：uri -> name -> options -> handler
server.registerResource(
  '使用指南',            // 第一位：资源名称
   // 自定义协议头，区分工具 / 文档类资源；
//    guide 资源路径，拼接成全局唯一地址，客户端靠它读取这份使用指南。
  'docs://guide',       // 第二位：资源URI
  {
    description: 'MCP Server 使用文档',
    mimeType: 'text/plain',
  },
  async () => {
    return {
      contents: [
        {
        // docs://guide 是 MCP 资源唯一标识 URI，用于客户端精准定位、读取对应静态文档资源。
          uri: 'docs://guide',
          mimeType: 'text/plain',
          text: `MCP Server 使用指南
功能：提供用户查询等工具。
使用：在 Cursor 等 MCP Client 中通过自然语言对话，Cursor 会自动调用相应工具。`,
        },
      ],
    };
  }
);

// 标准IO传输通道
const transport = new StdioServerTransport();

// 包装自执行async函数，兼容所有Node版本
(async () => {
  await server.connect(transport);
  console.log('MCP Server 已启动，stdio 通信就绪');
})();