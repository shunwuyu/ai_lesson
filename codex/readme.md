# Codex

chatgpt 推出的一个桌面级智能体。最近热度一路上涨，
比豆包、chatgpt 聊天工具更强大， 他们的核心是大模型， 很擅长理解和生成内容。
codex 属于AI 智能体， 大脑（负责判断下一步做什么）之外， 还配了一套能动手的工具（执行）
自己拆解任务，自己执行，遇到问题自己修正。把一件事从头到尾做完。

之前爆火的openclaw 被chatgpt收购了，codex集合了openclaw的桌面助手的架构以及
chatgpt大模型的支持， 当然也可以配置高性价比的deepseek。

codex 能做的事情比想像中多得多

- 超强的AI 编程工具
网站、App、小程序
- 超强的办公搭子
直接读取和操作本地的电脑文件
做表格、ppt, 

我们可以将claude code 和 codex  结合使用，
比如 Codex 写代码 ， Claude Code 审代码。 多智能体

## Codex 安装
- codex 安装 
https://openai.com/zh-Hans-CN/codex/?utm_source=chatgpt.com
- cc switch  最新版本 
改codex/cc 的一些配置文件， 不要连OpenAI的服务器了， 改成连国内服务器的地址。
手动也能做， 但麻烦。
选择 codex
apikey 
打开需要本地路由映射选项
codex 是openai 自家的工具，他和openai 之间用的是一套特定的沟通格式。
而国内的模型，如deepseek用的是另一套更通用的格式， 对不上。就好像两种方言。
开启后， ccswitch 就会帮我们做翻译
把codex 发出去的内容转换成deepseek 可以理解的模式。再把deepseek 返回的内容转换成codex 
可以理解的模式。

- 打开设置
路由-》本地路由
本地路由显示本地路由开关
路由总开关 都打开
路由启用勾选claude codex 