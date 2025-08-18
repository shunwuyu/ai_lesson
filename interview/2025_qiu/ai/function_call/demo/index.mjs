import OpenAI from "openai";
const client = new OpenAI({ 
    apiKey: 'sk-kR4sIw4lywCTKUz88SZFK08MH690UV5LvbyNnG8mn7IcT7VK',
    baseURL: 'https://api.302.ai/v1'
});
// console.log(client,'////');

async function getWeather(city) {
    // 真实情况会调第三方 API
    return { city, temp: "28°C", condition: "Sunny" };
}

async function main() {
  const resp = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: "今天北京天气怎么样？" }],
    tools: [
      {
        type: "function",
        function: {
          name: "getWeather",
          description: "获取某个城市的天气",
          parameters: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"]
          }
        }
      }
    ]
  });

  const toolCall = resp.choices[0].message.tool_calls?.[0];
  console.log("模型建议调用:", toolCall);

  if (toolCall?.function.name === "getWeather") {
    const args = JSON.parse(toolCall.function.arguments);
    const weather = await getWeather(args.city);

    // 把函数结果反馈给模型，让它生成自然语言回复
    const secondResp = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "user", content: "北京天气" },
        resp.choices[0].message, // 模型第一次返回的 tool_call
        {
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(weather)
        }
      ]
    });
    console.log(secondResp.choices[0].message.content);
  }
}
main();
