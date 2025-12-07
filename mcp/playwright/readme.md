# Playwright
[source](https://juejin.cn/book/7517259125575647272/section/7518697585671372834#heading-5)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f9eb6f4e2684b1482d33898fe10c275~tplv-k3u1fbpfcp-jj-mark:3780:0:0:0:q75.awebp#?w=720&h=405&s=33186&e=webp&b=f8f2e9)

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af4b614ded2f44d6ad2be331af028117~tplv-k3u1fbpfcp-jj-mark:3780:0:0:0:q75.awebp#?w=971&h=556&s=71700&e=png&b=fefefe)


MCP（Model Context Protocol）是一种让 AI “使用工具”的通用接口标准。
MCP 就像给 AI 插上 USB 接口，让它能使用各种插件和外部能力。
比如：浏览器、数据库、文件系统、运行代码、抓数据等。

没有 MCP 的 AI：

只能聊天、回答问题。

有 MCP 的 AI：

能打开文件

能访问数据库

能控制浏览器（如 Playwright）

能执行任务、跑脚本

像一个会“使用工具”的智能助理

MCP 是让 AI 具备“动手能力”的标准协议，把它从聊天机器人变成可执行任务的智能体（Agent）。

- MCP 添加
  设置(右上角)->MCP->市场添加->Playwright

- 介绍下playwright

Playwright MCP 是一种让 AI 直接控制浏览器执行任务的能力接口，使 AI 不仅能理解指令，还能真正操作网页，如点击、输入、抓取数据、导航等。通过 MCP，AI 从“回答问题”升级为“执行行动”，以目标为导向自主规划步骤并完成任务，实现智能化网页操作，是 AI Agent 能力的重要体现。

AI 不只是“给出建议”，而是能真正执行浏览器操作、完成任务、达成目标。 Agent

- 智能体这里选择 @Builder with MCP。
```
请帮我从 https://www.trae.ai/ 抓取产品信息，包括：
1. 产品名称和价格
2. 产品特点和优势
3. 将结果整理成表格形式

使用 MCP
```
AI 助手会使用 Playwright 访问网页，抓取信息并整理成表格。

在执行过程中，可以看到 Trae 会调用 Playwright 服务器，期间进行了多次工具调用，来获取页面产品信息。

- MCP 工具打开的浏览器窗口 Playwright/playwright_navigate
- Playwright/playwright_get_visible_text
- Playwright/playwright_navigate 
  Navigated to https://www.trae.ai/pricing 问的问题中包含价格
- Playwright/playwright_get_visible_text
- Playwright/playwright_close 完成了， 关闭网页

## 自动化测试

```
请帮我测试掘金网站的插件页面：
1. 打开 https://juejin.cn/
2. 点击顶部导航栏的"插件"按钮
3. 等待页面加载完成
4. 截图并保存到当前目录
5. 检查页面是否包含"插件"相关的内容

```