# AI Agent 开发要学什么？

- Agentic Enginner
    26年， 当算力像A4纸、纸杯耗材一样成为企业必需品，Agent 应用将会大量爆发。
    我们一起来丛Coder -> prompt Engineer -> Agentic Enginner（全栈）.

    把 AI 从“聊天工具”升级为“会自己干活的数字工程师, 自己拆解任务、调用工具、反复执行，直到把事情做完。

- 说说我们最近在用的AI Agent 产品？
    Cursor/Trae 写代码（编程Agent）
    Manus 办公自动化
    最近最火的openClaw (小龙虾) 我们只需要在手机上给它下条指令，就能帮我们把活干完。
    1.png

## 开发一个AI Agent ？

- 直接调用大模型？
    能获得智能，生成代码等  gemini 3.1 pro 春节档

- 问题
    - 你上周和它聊过的消息，它是不是记不住？ Memory 
    - 你让它帮你访问一个网页，做一些事情，它是不是只能告诉你思路让你自己做？ Tool 
    - 你想让它基于你公司内部的私密文档来做一些解答，它是不是不知道那是什么？ Rag知识库
    - 你问他刚发生的一个新闻，它是不是不知道？因为它训练的时候没这些数据 Tool

## Agent 是什么？

其实就是给大模型扩展了 Tool 和 Memory。它本来就可以思考（thinking）、规划(plan)，你给他用 Tool 扩展了能力，它就可以自动做事情了，用 Memory 管理了记忆，它就可以记住你想让它记住的东西(不断进化)，还可以用 RAG 查询内部知识库来获取知识。
这样一个知道内部知识、能思考规划、有记忆，能够帮你做事情的扩展后的大模型，就是一个 Agent。

- 每天用的的Cursor 等AI IDE 是怎么读写文件，执行命令的？
    比如改代码需要读写文件(read, write 能力)：
    - 用 react 创建一个todolist
    - 创建一个需要react + vite 的todolist （npm install ）

    运行代码需要执行命令
    如何实现这些功能呢？ 很明显是扩展了Tool

    - manus 唤起浏览器自动访问一些网页
    ![](https://mpvideo.qpic.cn/0b2ebmaisaaaniacaosh4ruvac6drefqbcia.f10002.mp4?dis_k=b6cdd82e5d4e2d5a40ed9c21823bc698&dis_t=1771896092&play_scene=10120&auth_info=E5zd4KABQS4bjeOZml1aEUAIIT8VBhoifGRGN0NHcQ8uIGBFGC9aY2wkbUUwMVcxVAI=&auth_key=dfdbb1af622cbf71d3932f5e86e0bda2&vid=wxv_4306909768532099094&format_id=10002&support_redirect=0&mmversion=false)

    - 帮我总结manus 最近的新闻
    manus 打开浏览器，访问网页， 点击元素， 帮总结成文档，写入md 文件

    - 支付宝里的理财助手，帮你分析基金，推荐基金，怎么知道基金数据的？
     基于RAG 访问了内部的知识库

## 总结
    光会和大模型聊天不行， 你得能给它扩展各种能力，这样才能满足各种AI 需求。

    那RAG、Memory、Tool、Agent用什么框架？ Langchain 封装了各种API 直接用

## langchain

用来开发单个Agent, 每个Agent 做一件事情。
多个Agent 协作？ LangGraph ,用于多Agent 交互的框架。

node/python 都支持

学AI也不只是学习用AI做一些工具， 最好是结合后端技术一起学习，AI全栈 
- React 前端
- Nest 后端
- Langchain/LangGraph AI






