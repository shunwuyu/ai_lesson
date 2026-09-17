# Sub Agents

https://github.com/shareAI-lab/learn-claude-code/blob/main/agents/s04_subagent.py

Harness 里的 SubAgent 就是子Agent，你可以理解为主 Agent 手下的小帮手。主 Agent 接到复杂任务后，拆出细分工作交给 SubAgent 单独去跑。每个 SubAgent 有独立对话空间，干活的中间过程不会污染主 Agent 上下文，干完只返回最终结果。还能多个并行执行，任务完成就销毁，这样主 Agent 不用被一堆细节拖累，专注统筹和汇总。

- SubAgent：子代理，主 Agent 的任务帮手
- 触发逻辑：主 Agent 收到复杂任务，拆分出子任务交给 SubAgent 执行
- 上下文隔离：拥有独立对话空间，中间过程不污染主 Agent 上下文
- 返回机制：仅把最终结果回传给主 Agent
- 运行特性：支持多个 SubAgent 并行执行
- 生命周期：任务完成后自动销毁
- 价值：主 Agent 脱离细节，专注统筹、汇总结果

```
Parent agent                    Subagent
    +------------------+            +------------------+
    | messages=[...]   |            | messages=[prompt]|
    |                  |   task     |                  |
    | tool: task       | ---------> | own agent loop   |
    |                  |            | base tools only  |
    | tool_result      | <--------- | final text       |
    +------------------+            +------------------+

  子代理本身**没有任务工具**，因此它不能再向下委派任务。
```

举个日常开发场景的例子：

主 Agent 接到需求：帮我做代码上线前全量检查。
它拆分任务，生成多个 SubAgent：

- SubAgent1：跑单元测试
- SubAgent2：扫描代码漏洞
- SubAgent3：校验配置文件

三个子代理并行干活，各自独立上下文，互不干扰。各自返回测试、漏洞、配置结果给主 Agent，主 Agent 汇总生成最终报告，子代理任务结束就销毁。

- 在当前工作目录新建一个 poem.txt，写入一首4行的小诗，然后读取这个文件把内容给我。