[](https://time.geekbang.org/column/article/882640)

# 私域旅游小助手开发流程

- 注册并配置高德地图 MCP 服务    
获取城市与景点的推荐接口，实现地点信息检索
- 注册并配置 Minimax 语音生成 MCP 服务：将文字转为语音，生成导览音频。
- 在 Cursor 中完成 MCP 服务的接入与调用配置：包括填写密钥、Model 兼容性设置、Agent 自动运行配置等。
- 编写 Prompt 驱动 Agent：自动获取西安各类景点介绍，并按类别分条整理。
- 调用 Minimax 生成语音导览：将生成的景点介绍文本自动转为语音文件。
- 生成并部署 HTML 页面：利用 Agent 将整理好的文本输出为一个静态网页，并部署到线上。

- minimax + cursor + mcp

