import type { NextRequest } from 'next/server';
import { Message, ChatRequest, ChatResponse } from '@/types/chat';

// Ollama 服务的地址
const OLLAMA_API_URL = 'http://localhost:11434/api/chat';

// 你想要使用的模型
const MODEL_NAME = 'deepseek-r1:1.5b';

export async function POST(request: NextRequest) {
  try {
    // 1. 解析客户端发来的请求体
    const body: { messages: Message[] } = await request.json();

    // 2. 构造发送给 Ollama 的请求体
    const ollamaRequestBody: ChatRequest = {
      model: MODEL_NAME,
      messages: body.messages,
      stream: false, // 默认就是 false，非流式
    };

    // 3. 调用 Ollama API
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ollamaRequestBody),
    });

    // 4. 检查 Ollama 响应状态
    if (!response.ok) {
      const errorText = await response.text();
      return Response.json(
        { error: `Ollama API Error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    // 5. 解析 Ollama 返回的 JSON 数据
    const ollamaData: ChatResponse = await response.json();

    // 6. 将 Ollama 的响应原样返回给前端客户端
    return Response.json(ollamaData);

  } catch (error) {
    console.error('Chat API Error:', error);
    return Response.json(
      { error: 'Internal Server Error', details: (error as Error).message },
      { status: 500 }
    );
  }
}