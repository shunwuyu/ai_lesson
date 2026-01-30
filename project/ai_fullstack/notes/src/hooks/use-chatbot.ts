// src/hooks/useChatbot.ts
// Vercel 是一家专注于前端开发与 AI 应用部署的公司，以 Next.js 框架为核心，推动现代 Web 开发。
// 它深度集成 AI 能力，提供 Vercel AI SDK 和无缝部署 LLM 应用的平台，
// 让开发者能快速构建、预览和上线智能前端应用，极大降低了 AI 产品化门槛。
// 用于快速构建 AI 聊天界面，自动管理消息历史、用户输入、AI 回复和加载状态。
// 1.2.12
import { useChat } from '@ai-sdk/react';

export const useChatbot = () => {
  // 只需要指向 mock 的 url 即可
  return useChat({
    api: 'http://localhost:3000/api/ai/chat',
    // api: '/api/ai/chat',
    onError: (err) => {
      console.error("Chat Error:", err);
    }
  });
};