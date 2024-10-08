import { ChatOpenAI } from "@langchain/openai";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { config } from 'dotenv'
config()
// history 对象来了 ephemeral 暂时
const demoEphemeralChatMessageHistory = new ChatMessageHistory();

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("messages"),
]);

const model = new ChatOpenAI({ model: "gpt-3.5-turbo" });

const chain = prompt.pipe(model);

await demoEphemeralChatMessageHistory.addMessage(
  new HumanMessage(
    "Translate this sentence from English to French: I love programming."
  )
);

await demoEphemeralChatMessageHistory.addMessage(
  new AIMessage("J'adore la programmation.")
);


// console.log(await demoEphemeralChatMessageHistory.getMessages());

await demoEphemeralChatMessageHistory.clear(); // 清空
console.log(await demoEphemeralChatMessageHistory.getMessages());

const input1 =
  "Translate this sentence from English to French: I love programming.";

await demoEphemeralChatMessageHistory.addMessage(new HumanMessage(input1));

const response = await chain.invoke({
  messages: await demoEphemeralChatMessageHistory.getMessages(),
});

// console.log(response);

await demoEphemeralChatMessageHistory.addMessage(response);
// console.log(demoEphemeralChatMessageHistory.getMessages())

const input2 = "What did I just ask you?";
await demoEphemeralChatMessageHistory.addMessage(new HumanMessage(input2));

console.log(await chain.invoke({
  messages: await demoEphemeralChatMessageHistory.getMessages(),
}));