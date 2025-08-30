- 如果 LLM 的返回内容可能包含 Markdown（如标题、列表、代码块、加粗等），那么使用 markdown-it 将其转换为 HTML 再渲染到页面上，是最佳实践。


- 1. 什么是流式输出？相比普通请求有何优势？
    流式输出是服务端分块（chunk）传输数据，前端边接收边展示。
    首屏更快：用户无需等待全部内容生成，立即看到部分内容（如 ChatGPT 逐字输出）。
    体验更流畅：避免长时间白屏或“思考中…”等待。
    节省内存：前端可增量处理，而非等待完整响应。

- 如何实现流式输出？用过 ReadableStream 吗？
    fetch 的 response.body 是一个 ReadableStream，可通过 getReader() 读取：

- json 没有接受完怎么办？
    parse会报错
    cache 

- 为什么会截断？
因为 HTTP chunked 传输不保证 JSON 包一定落在同一个 chunk 里，可能被分成两半甚至多半。

怎么解决？
不能直接 JSON.parse，要准备一个 buffer，把解析失败的残片缓存下来，等下一个 chunk 拼接后再解析。

关键点

用 TextDecoder(stream: true) 保证 UTF-8 字符不会被切坏。

用 buffer 解决 JSON 被拆开的情况。

每次解析失败时不要丢弃，而是等待后续拼接。