# 高德 MCP + 浏览器 MCP：LangChain 复用别人的 MCP Server 有多爽！

自己实现了一个 MCP Server，然后在 Cursor 或者 LangChain 里连上这个 server，就可以用里面的 tools 了。

它本质上还是 tool，只不过包了一层进程，可以通过 stdio（本地） 和 http（远程） 来访问。

有些tool 第三方已经提供了， 不要重复造轮子。
![](1.png)

高德MCP: 可以做位置查询、路线规划等

Chrome Devtools MCP 控制浏览器，打开关闭页面、点击元素、截图等

FileSystem MCP 读写文件、创建目录等


## 高德 MCP

- apiKey
https://developer.amap.com/

类型选 web 服务就行。

"amap-maps-streamableHTTP": {
    "url": "https://mcp.amap.com/mcp?key=cf385e5d7f12309e54eaa6a9180e068d"
}

这就是 http 的接入方式。

这个 mcp server 里肯定封装了和高德服务端的通信，本质上是一样的。其实你的前端简历里就可以写一下这个：我开发了一个 mcp server 的 npm 包，包含 xxx tool，支持 stdio 访问。可以在 cursor 或 langchain 里用 npx 执行来连上这个 mcp server。这样面试官一看就知道，这个人是真懂 MCP 的，而且还有实践经验。

 langchain 里用一下这个 mcp：

 