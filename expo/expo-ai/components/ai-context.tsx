// Vercel 的 AI SDK
// React Server Components (RSC) 环境下快速集成 AI 能力
// Vercel 的 AI SDK (ai/rsc) 之所以带 rsc，是因为它最初是为 Next.js App Router（基于 RSC）设计的。

// 在 Expo/React Native 项目里，如果直接用 ai/rsc，本质上就是把它当作 纯客户端调用的 SDK 来用，实际不会真的跑 RSC 逻辑。
// CoreMessage 是一个表示 AI 消息（包含角色和内容）的接口或类型
import type { CoreMessage } from "ai";
import {
  createAI,
  streamUI
} from "ai/rsc";

const nanoid = () => Math.random().toString(36).slice(2);

// 交叉类型
export type Message = CoreMessage & {
  id: string;
};

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
}[];

const actions = {
  onSubmit,
} as const;

export async function onSubmit(message: string) {
  const result = {
    value:''
  };
  return {
    id: nanoid(),
    display: result.value,
  }
}

// export const AI = ({ children }) => {
//   return (
//     <>
//     {children}
//     </>
//   )
// }

export const AI = createAI<AIState, UIState, typeof actions>({
  actions,
  initialUIState: [],
  initialAIState: { chatId: nanoid(), messages: []}
})