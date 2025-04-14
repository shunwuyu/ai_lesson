# MCP

https://juejin.cn/post/7486832959694209059?searchId=20250413091952E13DC0DDEE61551E839F

- 缺点
    LLM通常与外部系统和工具隔离，无法直接访问或操作用户环境中的资源和工具。

## MCP
    RAG 提供的也是上下文
    Model Context Protocol 是由 Anthropic 公司推出的一个开放协议，它标准化了应用程序如何向大型语言模型 (LLM) 提供上下文和工具的方式。
    我们可以将 MCP 理解为 AI 应用的"USB-C 接口"

    就像 USB-C 为各种设备提供了标准化的连接方式，MCP 为 AI 模型提供了与不同数据源和工具连接的标准化方式。

## MCP 可以做以下事情
    - 读取和写入本地文件
    - 查询数据库
    - 执行命令行操作
    - 控制浏览器
    - 与第三方 API 交互

## 核心组件
    - MCP Server 
    提供**工具**和**资源**的服务端，可以使用任何编程语言实现，只要能够通过 stdout/stdin 或 HTTP 通信。
    - MCP 客户端 (Client)
    使用 MCP 服务器提供的工具和资源的 AI 应用，如 Claude Desktop、Cursor 编辑器等。

## Tailwind CSS 导航栏示例

![Tailwind CSS Homepage Navigation](./tailwind-nav.png)

