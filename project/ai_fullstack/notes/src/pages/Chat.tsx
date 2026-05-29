// src/pages/ChatPage.tsx
'use client';

import { useState, useEffect } from 'react';
// 提供chatbot 需要的
import { useChatbot } from '@/hooks/use-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// 滚动区域组件 在内容溢出时提供美观、可控的滚动条，常用于替代浏览器默认滚动
import { ScrollArea } from '@/components/ui/scroll-area';
import { createPosts } from '@/api/post'
import Header  from '@/components/Header'

export default function ChatPage() {
  // 抽象 messages 数组
  // input 输入值 
  // isLoading AI 正在生成回复
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChatbot();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  useEffect(() => {
    (async () => {
      // await createPosts();
    })()
  }, [])

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 pb-2">
      <Header title="ChatBot" showBackBtn={true}/>

      <ScrollArea className="flex-1 border rounded-lg p-4 mb-4 bg-background">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Start a conversation with DeepSeek...
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}