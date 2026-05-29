// import OpenAI from 'openai';
import { deepseek } from './utils/deepseek.mjs';

// console.log(process.env)
// console.log(deepseek)

async function main() {
  const completion = await deepseek.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'user',
        content: 'What is the meaning of life?',
      },
    ],
  });
  console.log(completion.choices[0].message);
}
main();