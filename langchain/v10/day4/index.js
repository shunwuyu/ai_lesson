import { ChatDeepSeek } from "@langchain/deepseek";
import { tool } from "@langchain/core/tools";
import { z } from "zod";
import 'dotenv/config'

const addTool = tool(
  async ({ a, b }) => String(a + b),
  {
    name: "add",
    description: "计算两个数字的和",
    schema: z.object({
      a: z.number(),
      b: z.number(),
    }),
  }
);

const model = new ChatDeepSeek({
  model: "deepseek-chat",
  temperature: 0,
}).bindTools([addTool]);

const res = await model.invoke("3 + 5 等于多少？");

if (res.tool_calls?.length) {
  console.log(res.tool_calls);
  const result = await addTool.invoke(res.tool_calls[0].args);
  console.log("最终结果：", result);
}
