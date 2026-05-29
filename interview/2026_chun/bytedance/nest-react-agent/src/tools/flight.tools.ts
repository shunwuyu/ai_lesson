import { tool } from "@langchain/core/tools";
import { z } from "zod";

// 模拟航班数据
const MOCK_FLIGHTS = [
  {
    airline: "国航",
    flightNo: "CA1501",
    depTime: "2025-12-20 08:00",
    arrTime: "2025-12-20 10:00",
    cabin: "经济舱",
    price: 580,
  },
  {
    airline: "东航",
    flightNo: "MU5101",
    depTime: "2025-12-20 09:00",
    arrTime: "2025-12-20 11:00",
    cabin: "经济舱",
    price: 520,
  },
  {
    airline: "南航",
    flightNo: "CZ8889",
    depTime: "2025-12-20 10:00",
    arrTime: "2025-12-20 12:00",
    cabin: "经济舱",
    price: 499,
  },
  {
    airline: "海航",
    flightNo: "HU7601",
    depTime: "2025-12-20 11:00",
    arrTime: "2025-12-20 13:00",
    cabin: "经济舱",
    price: 600,
  },
];

// 工具1：查询航班
export const searchFlightsTool = tool(
  async (input) => {
    console.log(`[工具调用] 查询 ${input.depCity} → ${input.arrCity} ${input.date}`);
    return JSON.stringify(MOCK_FLIGHTS);
  },
  {
    name: "search_flights",
    description: "查询指定城市、日期的航班",
    schema: z.object({
      depCity: z.string(),
      arrCity: z.string(),
      date: z.string(),
    }),
  }
);

// 工具2：找最便宜经济舱
export const findCheapestEconomyTool = tool(
  async (input) => {
    console.log("[工具调用] 筛选最便宜经济舱");
    const flights = JSON.parse(input.flightsJson);
    const economy = flights.filter(f => f.cabin === "经济舱");
    economy.sort((a, b) => a.price - b.price);
    return JSON.stringify(economy[0]);
  },
  {
    name: "find_cheapest_economy",
    description: "从航班列表找出最便宜经济舱",
    schema: z.object({
      flightsJson: z.string(),
    }),
  }
);

export const FLIGHT_TOOLS = [searchFlightsTool, findCheapestEconomyTool];