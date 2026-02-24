import { tool } from '@langchain/core/tools';
// Node.js 自带的文件操作工具箱，专门用来异步读写文件， 不会阻塞主线程。
import fs from 'node:fs/promises';
// path 模块提供了处理文件路径的工具，包括拼接、解析、规范化等操作。
import path from 'node:path';
// 创建子进程
import { spawn } from 'node:child_process';
// Zod 是一个用于数据验证的库，它可以帮助我们检查数据是否符合预期，避免数据错误。
import { z } from 'zod';

// 1. 读取文件工具
const readFileTool = tool(
  async ({ filePath }) => {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      console.log(`  [工具调用] read_file("${filePath}") - 成功读取 ${content.length} 字节`);
      return `文件内容:\n${content}`;
    } catch (error) {
      console.log(`  [工具调用] read_file("${filePath}") - 错误: ${error.message}`);
      return `读取文件失败: ${error.message}`;
    }
  },
  {
    name: 'read_file',
    description: '读取指定路径的文件内容',
    schema: z.object({
      filePath: z.string().describe('文件路径'),
    }),
  }
);

// 2. 写入文件工具
const writeFileTool = tool(
  async ({ filePath, content }) => {
    try {
      // 获取文件路径的目录部分
      // 比如 /a/b/c.txt 的目录部分是 /a/b
      const dir = path.dirname(filePath);
      // 创建目录，如果目录不存在则创建
      // recursive: true 表示如果目录不存在，则创建它和它的所有父目录
      await fs.mkdir(dir, { recursive: true });
      // 写入文件
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`  [工具调用] write_file("${filePath}") - 成功写入 ${content.length} 字节`);
      return `文件写入成功: ${filePath}`;
    } catch (error) {
      console.log(`  [工具调用] write_file("${filePath}") - 错误: ${error.message}`);
      return `写入文件失败: ${error.message}`;
    }
  },
  {
    name: 'write_file',
    description: '向指定路径写入文件内容，自动创建目录',
    schema: z.object({
      filePath: z.string().describe('文件路径'),
      content: z.string().describe('要写入的文件内容'),
    }),
  }
);

// 3. 执行命令工具（带实时输出）
const executeCommandTool = tool(
 // 执行命令工具，支持指定工作目录，实时显示输出
  async ({ command, workingDirectory }) => {
    // 获取工作目录，如果未指定则使用当前工作目录
    const cwd = workingDirectory || process.cwd();
    console.log(`  [工具调用] execute_command("${command}")${workingDirectory ? ` - 工作目录: ${workingDirectory}` : ''}`);

    return new Promise((resolve, reject) => {
      // 解析命令和参数
      const [cmd, ...args] = command.split(' ');

      const child = spawn(cmd, args, {
        cwd,
        stdio: 'inherit', // 实时输出到控制台
        shell: true,
      });

      let errorMsg = '';

      child.on('error', (error) => {
        errorMsg = error.message;
      });

      child.on('close', (code) => {
        if (code === 0) {
          console.log(`  [工具调用] execute_command("${command}") - 执行成功`);
          const cwdInfo = workingDirectory
            ? `\n\n重要提示：命令在目录 "${workingDirectory}" 中执行成功。如果需要在这个项目目录中继续执行命令，请使用 workingDirectory: "${workingDirectory}" 参数，不要使用 cd 命令。`
            : '';
          resolve(`命令执行成功: ${command}${cwdInfo}`);
        } else {
          console.log(`  [工具调用] execute_command("${command}") - 执行失败，退出码: ${code}`);
          resolve(`命令执行失败，退出码: ${code}${errorMsg ? '\n错误: ' + errorMsg : ''}`);
        }
      });
    });
  },
  {
    name: 'execute_command',
    description: '执行系统命令，支持指定工作目录，实时显示输出',
    schema: z.object({
      command: z.string().describe('要执行的命令'),
      workingDirectory: z.string().optional().describe('工作目录（推荐指定）'),
    }),
  }
);

// 4. 列出目录内容工具
const listDirectoryTool = tool(
  async ({ directoryPath }) => {
    try {
      const files = await fs.readdir(directoryPath);
      console.log(`  [工具调用] list_directory("${directoryPath}") - 找到 ${files.length} 个项目`);
      return `目录内容:\n${files.map(f => `- ${f}`).join('\n')}`;
    } catch (error) {
      console.log(`  [工具调用] list_directory("${directoryPath}") - 错误: ${error.message}`);
      return `列出目录失败: ${error.message}`;
    }
  },
  {
    name: 'list_directory',
    description: '列出指定目录下的所有文件和文件夹',
    schema: z.object({
      directoryPath: z.string().describe('目录路径'),
    }),
  }
);

export { readFileTool, writeFileTool, executeCommandTool, listDirectoryTool };