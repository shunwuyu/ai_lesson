import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { config } from "dotenv";

config()


const demoEphemeralChatMessageHistory = new ChatMessageHistory();

await demoEphemeralChatMessageHistory.addMessage(
  new HumanMessage("Hey there! I'm Nemo.")
);

await demoEphemeralChatMessageHistory.addMessage(new AIMessage("Hello!"));

await demoEphemeralChatMessageHistory.addMessage(
  new HumanMessage("How are you today?")
);

await demoEphemeralChatMessageHistory.addMessage(new AIMessage("Fine thanks!"));

console.log(await demoEphemeralChatMessageHistory.getMessages());


const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

const runnableWithMessageHistoryPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const chain2 = runnableWithMessageHistoryPrompt.pipe(model)

const chainWithMessageHistory2 = new RunnableWithMessageHistory({
  runnable: chain2,
  getMessageHistory: (_sessionId) => demoEphemeralChatMessageHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

console.log(await chainWithMessageHistory2.invoke(
  {
    input: "What's my name?",
  },
  { configurable: { sessionId: "unused" } }
));