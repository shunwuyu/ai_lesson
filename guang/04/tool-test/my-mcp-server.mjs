// query_user 的工具供 AI 查询模拟数据库中的用户详细信息，并附带一份使用指南资源。
// Client/Server 客户端/服务端 通信， 
// MCP 服务器 用于定义服务器信息、注册工具（Tools）和资源（Resources）
import { McpServer } from'@modelcontextprotocol/sdk/server/mcp.js';
// 标准输入输出流 通信
import { StdioServerTransport } from'@modelcontextprotocol/sdk/server/stdio.js';
// 数据校验 zod tool parameter 校验
import { z } from'zod';
// 千问点奶茶 mcp 
// 数据库 服务器数据服务
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


// 注册工具：查询用户信息
// tool 来做一些事情
server.registerTool('query_user', {
    description: '查询数据库中的用户信息。输入用户 ID，返回该用户的详细信息（姓名、邮箱、角色）。',
    // 参数校验
    inputSchema: {
        userId: z.string().describe('用户 ID，例如: 001, 002, 003'),
    },
    }, async ({ userId }) => {
    // 查询数据库中的用户信息
    const user = database.users[userId];// 根据用户ID 查询数据库中的用户信息

if (!user) {// 如果用户不存在，返回错误信息
    return {
        content: [
            {
                type: 'text',
                text: `用户 ID ${userId} 不存在。可用的 ID: 001, 002, 003`,
            },
        ],
    };
    }
    // 如果用户存在，返回用户信息
return {
    content: [
      {
        type: 'text',
        text: `用户信息：\n- ID: ${user.id}\n- 姓名: ${user.name}\n- 邮箱: ${user.email}\n- 角色: ${user.role}`,
      },
    ],
  };
});

// 注册资源：使用指南  提供资源给llm 
// resouce 一般返回静态数据
server.registerResource(
    '使用指南',  // name 资源名称
    'docs://guide',  // uri 资源唯一标识 AI 想读它时必须报这个号码
    { // 资源描述
        description: 'MCP Server 使用文档',
        mimeType: 'text/plain',
    }, 
    // 资源内容
    async () => {
        return {
            contents: [
            {
                uri: 'docs://guide',
                mimeType: 'text/plain',
                text: `MCP Server 使用指南
                功能：提供用户查询等工具。
                使用：在 Cursor 等 MCP Client 中通过自然语言对话，Cursor 会自动调用相应工具。`,
            },
        ],
    };
});

// 给服务器装了一根“管道”， 把服务器和客户端连接起来， 天线宝宝
// 本地进程的调用方式
const transport = new StdioServerTransport();
// 启动服务器
await server.connect(transport); 