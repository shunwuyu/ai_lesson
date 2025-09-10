"use client";
import { useChat } from "@ai-sdk/react";
import ChatInput from "@/components/ChatInput";

export default function Home() {
  //Hook 解构出聊天功能所需的状态和方法：输入框内容、输入处理函数、表单提交、消息列表和连接状态。

  const { input, handleInputChange, handleSubmit, messages, status } =
      useChat();
    
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">PhoneGPT</h1>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Output genarated using content from{" "}
        <a
          href="https://www.wikipedia.org/"
          target="_blank"
          className="font-bold"
        >
          Wikipedia
        </a>{" "}
        available under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          className="font-bold"
        >
          Creative Commons Attribution-ShareAlike License.
        </a>
      </p>
    </main>
  )
}

