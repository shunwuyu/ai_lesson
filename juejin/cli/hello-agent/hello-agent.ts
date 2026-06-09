// 导入 Node.js 内置的 readline 模块，用于在命令行读取用户输入，
import readline from 'node:readline'
import { streamText, stepCountIs, tool } from 'ai'
import { deepseek } from '@ai-sdk/deepseek'
// console.log('1111');
import fs from 'node:fs/promises'
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
    const result = streamText({
      model: deepseek('deepseek-v4-flash'),
      apiKey: process.env.DEEPSEEK_API_KEY,
      messages,
      tools: { readFile },
      stopWhen: stepCountIs(10), // 最多 10 轮工具调用就收手
    })
    process.stdout.write('助手: ')
    for await (const chunk of result.fullStream) {
      if (chunk.type === 'text-delta') process.stdout.write(chunk.text)
      else if (chunk.type === 'tool-call') process.stdout.write(`\n  [调用 ${chunk.toolName}(${JSON.stringify(chunk.input)})]`)
      else if (chunk.type === 'tool-result') process.stdout.write(`\n  [返回 ${String(chunk.output).length} 字节]\n助手: `)
    }

    const { messages: newMessages } = await result.response
    messages.push(...(newMessages as any))
  }
  rl.close()
}

main().catch(console.error)