import { ChatDeepSeek } from "@langchain/deepseek";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import 'dotenv/config'



// 假天气数据库
const fakeWeatherDB = {
  北京: { temp: "30°C", condition: "晴", wind: "微风" },
  上海: { temp: "28°C", condition: "多云", wind: "东风 3 级" },
  广州: { temp: "32°C", condition: "阵雨", wind: "南风 2 级" },
};

const weatherTool = tool(
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

const model = new ChatDeepSeek({
  model: "deepseek-chat",
  temperature: 0,
}).bindTools([weatherTool]);


const res = await model.invoke("北京今天的天气怎么样？");

// 判断是否调用了 Tool
if (res.tool_calls?.length) {
  const toolCall = res.tool_calls[0];
  const result = await weatherTool.invoke(toolCall.args);
  console.log(result);
}