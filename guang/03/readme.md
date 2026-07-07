# 实现 mini cursor：大模型自动调用 tool 执行命令

如果我们给它扩展了执行命令、写文件、创建目录、读取目录、读文件等 tool，是不是就能实现 cursor 的功能呢？

- react + vite 创建todoList
比如创建项目对文件做增删改：
项目创建后自动执行命令安装依赖和跑服务：
简易版cursor确实可以写了

这节我们就来实现下大模型根据 prompt 生成项目代码，自动读写文件、通过命令安装依赖、自动把项目跑起来，全程自己调用 tool 的功能：


首先， node 里如何执行命令呢？用 child_process 这个内置模块。

该模块用于创建**子进程**，执行外部命令、脚本，实现多进程调度与进程间通信（IPC = Inter（相互）-Process Communication）。

Node.js 主进程自己有一堆业务逻辑要处理，遇到执行 shell 命令、运行外部脚本这类耗时任务，就交给 child_process 创建的子进程单独跑，不用主线程阻塞等待，等子进程执行完毕再把结果回调通知主进程就行。

创建 src/node-exec.mjs

- const command = 'echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts';

echo n 然后通过管道操作符输出给那个进程就和我们键盘输入 n 一样的效果。

测试完之后，接下来就是封装 tools 了。