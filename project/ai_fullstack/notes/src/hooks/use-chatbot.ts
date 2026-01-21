// src/hooks/useChatbot.ts
import { useChat } from '@ai-sdk/react';

export const useChatbot = () => {
  // 只需要指向 mock 的 url 即可
  return useChat({
    api: '/api/chat',
    onError: (err) => {
      console.error("Chat Error:", err);
    }
  });
};