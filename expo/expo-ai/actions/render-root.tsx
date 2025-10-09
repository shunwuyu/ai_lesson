import { AI } from "@/components/ai-context";
import { ChatUI } from "@/components/chatui";

export async function renderRoot() {
  return (
    <AI>
      <ChatUI />
    </AI>
  )
}