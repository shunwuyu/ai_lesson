import { config } from 'dotenv'
config()
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate, // chat prompt 
  MessagesPlaceholder, // 消息占位符
} from "@langchain/core/prompts";

const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0
});
// 由系统角色和messages 占位组成
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant. Answer all questions to the best of your ability.",
  ],
  new MessagesPlaceholder("messages"),
]);

const chain = prompt.pipe(model);
// memory
console.log(await chain.invoke({
  messages: [
    new HumanMessage(
      "Translate this sentence from English to French: I love programming."
    ),
    new AIMessage("J'adore la programmation."),
    new HumanMessage("What did you just say?"),
  ],
}));