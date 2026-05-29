
// spawn 核心是让 Node.js 开 “子进程” 执行系统命令，主程序和子进程互不阻塞；
// 不是多线程，而是多进程。 主进程和子进程是并行的，不会互相阻塞。
// 纯前端（浏览器环境）没有原生的 spawn 能力， node 有操作系统赋予多进程能力。
// 产卵 
import { spawn } from'node:child_process';

const command = 'ls -la';
// const command = 'echo -e "n\nn" | pnpm create vite react-todo-app --template react-ts';
const cwd = process.cwd(); // 当前工作目录

// 解析命令和参数
const [cmd, ...args] = command.split(' '); // 命令和参数分开

const child = spawn(cmd, args, {
    //指定子进程在哪个目录下执行命令
    cwd,
    // Standard I/O 
    // 子进程继承父进程的输入输出
    // 直接显示在当前控制台
    stdio: 'inherit', // 实时输出到控制台
    // 系统 shell 执行 windows 不支持， git bash
    shell: true,
});

let errorMsg = '';

child.on('error', (error) => {
  errorMsg = error.message;
});

child.on('close', (code) => {
if (code === 0) {
    // 退出进程
    process.exit(0);
  } else {
    if (errorMsg) {
      console.error(`错误: ${errorMsg}`);
    }
    // 退出进程 1 程序异常/失败退出
    process.exit(code || 1);
  }
});