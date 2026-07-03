# claude code 上手必须知道的9个命令

cc 有几十个命令， 我们先掌握这些， cc 的使用效率和token的消耗都会好太多了。

- config 
查看和修改当前的配置
  - 自动去压缩对话 Auto-compact
  编码时日志、代码、多轮对话
  很容易塞满上下文，自动压缩会悄悄精简历史腾空间防报错，但容易弄丢代码细节、既定开发规则。关闭自动压缩，能完整留存全部对话内容，避免模型记错需求、漏写逻辑。

  - 是否自动切换思考模式 Thinking mode
  - Rewind code (checkpoints)（true）：开启代码快照回滚，可随时撤回恢复历史代码版本。

  例子：
  1.js 
  ```
  var a = 1;
  ```
  帮我修改 @ai/yao/cc-command/1.js 为es6风格
  /rewind 向上选择

- /model 查看或切换当前模型
ccswitch  Sonnet  对应 deepseek-v4-pro
          Opus    deepseek-v4-pro
          Haiku   deepseek-v4-flash
          简单任务 deepseek-v4-flash Haiku
          复杂任务 deepseek-v4-pro   Sonnet
- /clear  聊着聊着 claude 开始抽风了， 
  越来越慢， token 消耗的越来越多， 这是因为上下文太长了， 可以输入/clear 清除上下文.
  重新开启一个新的对话。建议每个独立的任务都开启一个新的对话。

  /context 查看当前上下文
  写篇文章看 Messages
- /compact
  如果不想完全去清空对话， 又想减少上下文的一个长度，可以输入
  会自动的压缩历史对话， 去保留关键信息， 简单理解就是给对话做一次瘦身。
- /resume 回到之前的对话
  可以看到历史对话列表， 选择任何一个， 就可以直接跳回去继续。
  相当于历史记录的功能。
- /export 
  把整段对话导出成一个plain text 文件 
    包括每一个提示、工具调用。
    适合解决棘手问题后，去做备份，方便后续的复盘或分享。