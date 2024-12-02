import {
  RunnablePassthrough,
  RunnableSequence
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
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

const trimMessages = async (_chainInput) => {
  const storedMessages = await demoEphemeralChatMessageHistory.getMessages();
  if (storedMessages.length <= 2) {
    return false;
  }
  await demoEphemeralChatMessageHistory.clear();
  for (const message of storedMessages.slice(-2)) {
    demoEphemeralChatMessageHistory.addMessage(message);
  }
  return true
}

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

const chainWithTrimming = RunnableSequence.from([
  RunnablePassthrough.assign({ messages_trimmed: trimMessages }),
  chainWithMessageHistory2,
]);

await chainWithTrimming.invoke(
  {
    input: "Where does P. Sherman live?",
  },
  { configurable: { sessionId: "unused" } }
);

console.log(await demoEphemeralChatMessageHistory.getMessages());
// I'm sorry, 
console.log(await chainWithTrimming.invoke(
  {
    input: "What is my name?",
  },
  { configurable: { sessionId: "unused" } }
));