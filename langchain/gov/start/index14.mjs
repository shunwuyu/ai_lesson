import { config } from 'dotenv'
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

config()

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });
const runnableWithMessageHistoryPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

// console.log(runnableWithMessageHistoryPrompt)
const chain2 = runnableWithMessageHistoryPrompt.pipe(model);
// console.log(chain2)
const demoEphemeralChatMessageHistoryForChain = new ChatMessageHistory();

const chainWithMessageHistory = new RunnableWithMessageHistory({
  runnable: chain2,
  getMessageHistory: (_sessionId) => demoEphemeralChatMessageHistoryForChain,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

console.log(await chainWithMessageHistory.invoke(
  {
    input:
      "Translate this sentence from English to French: I love programming.",
  },
  { configurable: { sessionId: "unused" } }
));

console.log(await chainWithMessageHistory.invoke(
  {
    input: "What did I just ask you?",
  },
  { configurable: { sessionId: "unused" } }
));