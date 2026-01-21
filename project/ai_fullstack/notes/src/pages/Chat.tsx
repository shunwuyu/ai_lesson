// src/pages/ChatPage.tsx
'use client';

import { useState } from 'react';
import { useChatbot } from '@/hooks/use-chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChatbot();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsSubmitting(true);
    handleSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <header className="py-4 text-center">
        <h1 className="text-2xl font-bold">DeepSeek Chat (Frontend Only)</h1>
        <p className="text-sm text-muted-foreground">
          ⚠️ API Key exposed in frontend — for demo only!
        </p>
      </header>

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
          disabled={isLoading || isSubmitting}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}