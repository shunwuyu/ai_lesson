import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
// history 对象来了 ephemeral 暂时
const demoEphemeralChatMessageHistory = new ChatMessageHistory();

await demoEphemeralChatMessageHistory.addMessage(
  new HumanMessage(
    "Translate this sentence from English to French: I love programming."
  )
);

await demoEphemeralChatMessageHistory.addMessage(
  new AIMessage("J'adore la programmation.")
);


console.log(await demoEphemeralChatMessageHistory.getMessages());