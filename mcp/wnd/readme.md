[source](https://www.bilibili.com/video/BV1WtECzZEpa/?spm_id_from=333.337.search-card.all.click&vd_source=3d50341f547faf8df242a214b04f2d86)

# MCP: Build Rich-Context AI Apps with Anthropic

take place 发生
instructor 技能培训 
head of technical education  技术教育负责人
internal project 内部的
model agnostic 模型无关性
plug into  接入
Say you're building a research assistant agent, and you'd like for this agent to interact with your Github
repos, read notes from your Google Drive documents, 
maybe create a summary store in your local system.
you can connect your agent to the Github, Google Drive,
and File System service, which will provide the tool or the API call definition and also handle the tool execution.

make it MCP compatiable.
how mcp addresses this.

## why-mcp
how mcp makes AI development **less fragmented（碎片）**.
how it standardizes **connections** between AI applications and external data sources.
the model are only as good as the **context** provided to them.
incredibly intelligent model  as the frontiner
It is not useful as it can possibly be.
REST APIs standardize how web applications interact with the backend。
LSP standardize how IDEs interact with language-specific tools 
MCP srtandarizes how AI applicaiton interact with external systems
reinvent the wheel in how we do things like tool use,
novel 新颖 原始数据类型
can be done without mcp 
build once and use everywhere.
triage particular issues and assign tickes in 

## 
- MCP is based on a client-server architecture.
- 给模型提供上下文
- This client live inside a host.
- The host is responsible for storing and maintaining all of the clients and connections to MCP servers.
- host are LLM applications that want to access data through MCP
- The server are lightweight programs that expose the specific capabilities through the protocol.
- under the hood
- tools are functions that can be invoked by the client  

## 手把手教《用MCP构建AI Apps》（附代码）Deeplearning.AI——大模型/LLM/Langchain
- And before we hop into building MCP servers.

## MCP Server
- standard io transport.
- FastMCP high-level interface to build an MCP server
- MCP inspector to test your server