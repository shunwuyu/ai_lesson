# 丛Tool 开始： 让大模型自动调工具读文件

我们和大模型聊天，可以问它一些问题，它告诉你怎么做。
但是大模型没法帮你去做。
比如你想创建一个 react + vite 的 todolist 项目，你直接问大模型，它只能告诉你应该创建哪些文件，代码是什么，但是不能帮你读写文件、执行命令。
但是 cursor 是可以的：

你让它创建一个 todolist 项目，它会直接给你写入文件。

你还可以让它安装依赖，把项目跑起来：

怎么实现？

开发一些 tool 交给 agent 调用就可以了。

比如读文件、写文件、读取目录、创建目录、执行命令

1.png

首先，我们找个大模型来用：这里我们用阿里的千问，因为每个用户登录都有 100 万免费 token

[qwen 100万token](https://bailian.console.aliyun.com/?tab=api#/api)


搜coder 相关的模型

模型服务-> 模型广场-> 全部模型 -> coder -> Qwen-Coder-Turbo
查看api 例子

- tool-test
    pnpm i @langchain/openai
    引入dotenv