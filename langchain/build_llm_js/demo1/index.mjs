import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages"

const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106"
});

console.log(await model.invoke([
    new HumanMessage("Tell me a joke.")
], {
    proxy:{
        host: '127.0.0.1',
        port: 7890
    }
}));