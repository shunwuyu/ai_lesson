import express from 'express'
import cors from 'cors'
import { ChatOllama } from "@langchain/ollama";
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const app = express();
const PORT = 3001; 

// 中间件配置
app.use(cors()); // 允许前端跨域访问
app.use(express.json());

const model = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "deepseek-r1:8b",
  temperature: 0.1, // 代码生成需要严谨，温度调低
});

// 简单的 hello 接口
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from AI backend!' });
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input: message is required and must be a string.' });
  }

  try {
    // 构建提示模板（可选：你可以根据需要自定义系统提示）
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful AI assistant.'],
      ['human', '{input}']
    ]);

    // 构建链：prompt + model + output parser
    // 把大模型（LLM）返回的原始响应（通常是结构化的消息对象）转换成一个干净的字符串
    // 返回的是类似 { content: "你好！", role: "assistant" } 的消息对象
    // 只提取 .content 字段
    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    // 调用链
    const response = await chain.invoke({ input: message });

    // 返回响应
    res.json({ reply: response });
  } catch (error) {
    console.error('Error during chat:', error);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});



app.post('/api/generate-commit', async (req, res) => {
  try {
    const { diff } = req.body;
    if (!diff) {
      return res.status(400).json({ error: "Git Diff 不能为空" });
    }

    // 1. 定义 Prompt (提示词工程)
    // 我们可以定义 System Message (人设) 和 Human Message (用户输入)
    // Conventional Commits（约定式提交） 是一种轻量级的提交消息格式规范，
    // 旨在通过结构化的提交信息提升 Git 提交日志的可读性、自动化能力和团队协作效率。
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "你是一个资深代码审查专家。请根据用户提供的 `git diff` 内容，生成一段符合 Conventional Commits 规范的提交日志。要求：1. 格式为 <type>(<scope>): <subject>。2. 保持简洁。3. 不要输出 markdown 格式，只输出文字。"],
      ["user", "{diff_content}"],
    ]);

    // 2. 构建处理链 (Chain)
    // 数据流向：Prompt模板 -> 模型 -> 字符串解析器
    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    console.log("正在调用 Ollama...");

    // 3. 执行
    const result = await chain.invoke({
      diff_content: diff,
    });

    // DeepSeek R1 有时候会输出思考过程 <think>...</think>，我们需要清洗掉
    const cleanResult = result.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    res.json({ result: cleanResult });


  } catch(err) {
    console.error("AI 服务出错:", error);
    res.status(500).json({ error: "模型调用失败，请检查 Ollama 是否运行" });
  }
})

app.listen(PORT, () => {
  console.log(`🚀 AI 后端服务运行在 http://localhost:${PORT}`);
});
