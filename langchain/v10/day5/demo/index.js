// 首先创建一个简单的智能体（agent），它能够回答问题并调用工具。
// 该智能体将使用 Claude Sonnet 4.5 作为其语言模型，一个基础的天气
// 查询函数作为工具，并通过一个简单的提示词（prompt）来引导其行为
import { createAgent, tool } from "langchain";
import { ChatDeepSeek } from "@langchain/deepseek";
import * as z from "zod";
import 'dotenv/config';

const getWeather = tool(
  (input) => `It's always sunny in ${input.city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
  }
);

const model = new ChatDeepSeek({
  model: "deepseek-chat",
});

const agent = createAgent({
  model,
  tools: [getWeather],
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
  })
);