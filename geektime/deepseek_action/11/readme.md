# https://time.geekbang.org/column/article/862219

- 安装postgresql
- 插入表
- 配置mcp 
    "postgres": {
        "command": "npx",
        "args": [
          "-y",
          "@modelcontextprotocol/server-postgres",
          "postgresql://postgres:1234567890@localhost:5432/achievement"
        ]
      }
- prompt
    连接一个名为postgres的MCP 服务器，它提供了查询数据库的工具。使用query工具，有几个用户？

