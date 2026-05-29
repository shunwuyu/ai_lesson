import {HumanMessage, SystemMessage } from "langchain";
import 'dotenv/config';
import { ChatDeepSeek } from "@langchain/deepseek";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const model = new ChatDeepSeek({
  model: "deepseek-chat",
});

// Message prompts
const systemMsg = new SystemMessage("You are a helpful assistant.");
const humanMsg = new HumanMessage("Hello, how are you?");
// 
const messages = [systemMsg, humanMsg];
// const response = await model.invoke(messages);  // Returns AIMessage
// console.log(response.content);
// Text prompts
// const response2 = await model.invoke("Write a haiku about spring");
// console.log(typeof response2);
// console.log(response2.content);


const fakeWeatherDB = {
  北京: { temp: "30°C", condition: "晴", wind: "微风" },
  上海: { temp: "28°C", condition: "多云", wind: "东风 3 级" },
  广州: { temp: "32°C", condition: "阵雨", wind: "南风 2 级" },
};

const getWeather = tool(
  async ({ city }) => {
    const weather = fakeWeatherDB[city];
    if (!weather) {
      return `暂无 ${city} 的天气数据`;
    }
    return `${city}：${weather.condition}，${weather.temp}，${weather.wind}`;
  },
  {
    name: "get_weather",
    description: "查询指定城市的今日天气情况",
    schema: z.object({
      city: z.string().describe("城市名称，如 北京、上海"),
    }),
  }
);

const modelWithTools = model.bindTools([getWeather]);
const response = await modelWithTools.invoke("北京天气怎么样?");

for (const toolCall of response.tool_calls) {
  console.log(`Tool: ${toolCall.name}`);
  console.log(`Args: ${JSON.stringify(toolCall.args)}`);
  console.log(`ID: ${toolCall.id}`);
}
