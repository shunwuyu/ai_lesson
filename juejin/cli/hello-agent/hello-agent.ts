// 导入 Node.js 内置的 readline 模块，用于在命令行读取用户输入，
import readline from 'node:readline'
// Vercel 是 Next.js 开发团队打造的前端云平台 ，提供 AI 相关的 SDK'
// streamText 流式输出
// stepCountIs 控制模型调用次数，最多 10 轮工具调用就收手
// tool 定义一个工具函数，用于在模型中调用外部函数
import { streamText, stepCountIs, tool } from 'ai'
// ai-sdk 是 Vercel 提供的 AI 相关的 SDK，用于调用 AI 模型
import { deepseek } from '@ai-sdk/deepseek'
// console.log('1111');
// node 内置的 fs 模块，用于读写文件系统
import fs from 'node:fs/promises'
// zod 是一个类型验证库，用于在运行时验证输入数据的类型和格式
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const readFile = tool({
  description: '读取一个文本文件，返回完整内容',
  inputSchema: z.object({
    path: z.string().describe('要读取的文件路径'),
  }),
  execute: async ({ path }) => {
    return await fs.readFile(path, 'utf-8')
  },
})

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  // rl.question('你叫什么名字？', (answer:string) => {
  //   console.log(`你好，${answer}！`);
  //   rl.close(); // 用完必须关闭
  // });
  // 把回调风格的 rl.question 包装成返回 Promise 的异步函数，方便用 await 优雅地获取用户输入，
  // 参数是问题字符串，返回值是用户输入的字符串。
  const ask = (q: string) => new Promise<string>((r) => rl.question(q, r))
  const messages: Array<{ role: 'user' | 'assistant'; content: any }> = []
  for (;;) {
    const input = (await ask('\n你: ')).trim();
    // console.log(input);
    if (!input || input === 'exit') break
    messages.push({ role: 'user', content: input })
    // 基于 Vercel AI SDK 的streamText流式调用 DeepSeek V4 Flash 模型
    const result = streamText({
      model: deepseek('deepseek-v4-flash'),
      apiKey: process.env.DEEPSEEK_API_KEY,
      messages,
      tools: { readFile }, // 给模型开放读取本地文件的函数能力，AI 可自主调用读文件
      stopWhen: stepCountIs(10), // 最多 10 轮工具调用就收手
    })
    process.stdout.write('助手: ')
    // 逐个接收网络返回的小块数据 chunk
    for await (const chunk of result.fullStream) {
      // 处理文本增量
      if (chunk.type === 'text-delta') process.stdout.write(chunk.text)
      // 处理工具调用
      else if (chunk.type === 'tool-call') process.stdout.write(`\n  [调用 ${chunk.toolName}(${JSON.stringify(chunk.input)})]`)
      // 处理工具调用结果
      else if (chunk.type === 'tool-result') process.stdout.write(`\n  [返回 ${String(chunk.output).length} 字节]\n助手: `)
    }

    const { messages: newMessages } = await result.response
    messages.push(...(newMessages as any))
  }
  rl.close()
}

main().catch(console.error)