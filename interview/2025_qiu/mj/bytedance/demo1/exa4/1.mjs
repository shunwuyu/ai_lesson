import OpenAI from "openai";
import {
    config
} from 'dotenv'
config();
console.log(process.env.OPENAI_API_KEY);
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// 大模型的对话是 无状态的，如果你不传入历史消息，它根本不知道之前聊过什么。
// async function noMemoryChat() {
//     // 第一次问：我的名字是什么？
//     const res1 = await client.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: "我的名字是 Andrew" }
//       ]
//     });
//     console.log("第一次回复:", res1.choices[0].message.content);
  
//     // 第二次问：我叫什么名字？
//     const res2 = await client.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: "我叫什么名字？" }
//       ]
//     });
//     console.log("第二次回复:", res2.choices[0].message.content);
//   }
  
//   noMemoryChat();
// 简单记忆 —— 人工拼接历史消息
// 如果对话很长，消息会无限增长，超出 token 限制 → 记忆丢失或报错。 费钱
// const messages = [
//     { role: "system", content: "你是一个友好的助教。" }
// ];
  
// async function withMemory(userInput) {
//     messages.push({ role: "user", content:userInput });

//     const res = await client.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages
//     });

//     const reply = res.choices[0].message.content;
//     messages.push({ role: "assistant", content: reply });

//     console.log("AI 回复:", reply);
// }
  
// async function demo() {
//     await withMemory("我的名字是 Andrew");
//     await withMemory("我叫什么名字？");
// }

// demo();

// 模型不会无限遗忘，老对话被总结进 记忆摘要。
let summary = "用户的基本信息：";
const messages = [];

async function smartChat(userInput ) {
    messages.push({ role: "user", content: userInput });
  
    // 如果对话太长，就让模型做总结
    if (messages.length > 10) {
      const sumRes = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "请总结以下对话的关键信息" },
          ...messages
        ]
      });
  
      summary += sumRes.choices[0].message.content;
      messages.splice(0, messages.length); // 清空老对话
    }
const res = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: `你是一个助教，这是目前的总结：${summary}` },
      ...messages
    ]
  });
  const reply = res.choices[0].message.content;
  messages.push({ role: "assistant", content: reply });

  console.log("AI 回复:", reply);
}

smartChat();