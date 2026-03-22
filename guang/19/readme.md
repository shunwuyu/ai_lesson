# Nest + tool 实现 OpenClaw 同款定时任务功能（上）

定时任务是 Agent 常见功能。

豆包
明天下午3点提醒我腾讯会议面试。

查看所有的提醒

- 原理

你让它某个时间做某件事情。它会调用定时任务的 tool 设置一个提醒，并且你可以单独管理所有的提醒。

## OpenClaw 的定时任务

[openclaw](https://github.com/openclaw/openclaw)

star, 并fork

- claude 
    有实现定时任务的功能么，怎么做的？ 新项目的了解，省去看代码

- OpenClaw 的定时任务有两种：
    可以创建定时任务，传入文本，到时间会启动一个 Agent Loop 来执行
    Agent 自主规划、执行工具并循环反思，直到完成任务。
- 心跳机制定期主动做一些事情

到时间后跑一个 agent loop 循环调用 tool call 做事情：

通过cli 创建cron


既然各种 Agent 都有定时任务功能，那我们也按照这个方案实现一遍，后面可以集成到我们的 Agent 项目里。

可以这样理解 OpenClaw 的定时任务：

你先设一个“每天9点干活”的规则，定时任务 tool 到点触发，把任务丢给 LLM。接下来关键来了——LLM 不是只做一次，而是进入一个循环：

思考 → 调用工具 → 拿结果 → 再思考 → 再调用工具…

这个反复过程，就是 Agent Loop。
比如它会：先搜索资讯 → 再整理内容 → 再生成邮件 → 最后调用发邮件工具。

直到任务完成才停止。

一句话总结：
定时任务负责“什么时候做”，Agent Loop负责“怎么一步步做完”。

## 开发

http://localhost:3000/ai/chat?query=%E7%94%A8%E6%88%B7001

- 打通了 tool 里调用 service
