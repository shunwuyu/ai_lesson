// memory 
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { RunnableWithMessageHistory, RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import {
  AIMessage,
  HumanMessage
} from '@langchain/core/messages'
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
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

console.log(demoEphemeralChatMessageHistory.getMessages())
const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });
const runnableWithSummaryMemoryPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability. The provided chat history includes facts about the user you are speaking with.",
  ],
  new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);

const summaryMemoryChain = runnableWithSummaryMemoryPrompt.pipe(model);

const chainWithMessageHistory3 = new RunnableWithMessageHistory({
  runnable: summaryMemoryChain,
  getMessageHistory: (_sessionId) => demoEphemeralChatMessageHistory,
  inputMessagesKey: "input",
  historyMessagesKey: "chat_history",
});

const summarizeMessages = async (_chainInput) => {
  const storedMessages = await demoEphemeralChatMessageHistory.getMessages();
  if (storedMessages.length === 0) {
    return false;
  }
  const summarizationPrompt = ChatPromptTemplate.fromMessages([
    new MessagesPlaceholder("chat_history"),
    [
      "user",
      "Distill the above chat messages into a single summary message. Include as many specific details as you can.",
    ],
  ]);
  const summarizationChain = summarizationPrompt.pipe(model);
  const summaryMessage = await summarizationChain.invoke({
    chat_history: storedMessages,
  });
  // 清空
  await demoEphemeralChatMessageHistory.clear();
  // 加入总结的
  demoEphemeralChatMessageHistory.addMessage(summaryMessage);
  return true;
};

const chainWithSummarization = RunnableSequence.from([
  RunnablePassthrough.assign({
    messages_summarized: summarizeMessages,
  }),
  chainWithMessageHistory3,
]);


console.log(await chainWithSummarization.invoke(
  {
    input: "What did I say my name was?",
  },
  {
    configurable: { sessionId: "unused" },
  }
));

await demoEphemeralChatMessageHistory.getMessages();