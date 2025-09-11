"use client";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@ai-sdk/react";
import ChatOutput from "@/components/ChatOutput";

export default function Home() {
  // /api/chat 是默认地址
  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    status
  } = useChat()
  // console.log(input, handleInputChange, handleSubmit)

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">PhoneGPT</h1>

      <div className="space-y-4 mb-4 max-h-[80vh] overflow-y-auto">
        <ChatOutput messages={messages} status={status} />
      </div>

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
  );
}