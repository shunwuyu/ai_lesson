// import OpenAI from 'openai';
// import { deepseek } from './utils/deepseek.mjs';
import { configDotenv  } from 'dotenv';
configDotenv();
// console.log(process.env)
// console.log(deepseek)

async function main() {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'user',
                    content: 'What is the meaning of life?'
                }
            ]
        })
    })
    const data = await res.json();
    console.log(data.choices[0].message)
//  ({
//     model: 'deepseek-chat',
//     messages: [
//       {
//         role: 'user',
//         content: 'What is the meaning of life?',
//       },
//     ],
//   });
//   console.log(completion.choices[0].message);
}
main();