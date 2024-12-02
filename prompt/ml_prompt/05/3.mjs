// universal translator
import dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})

const get_completion = async (prompt, model="gpt-4o") => {
    const messages = [{role: "user", content: prompt}];
    const response = await client.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0,
    });
    return response.choices[0].message.content;
} 

// 
const main = async () => {
  // 将以下俚语翻译成商务信函中的正式用语
  // const prompt = `
  // Translate the following from slang to a business letter: 
  // 'Dude, This is Joe, check out this spec on this standing lamp.'
  // `
  // const response = await get_completion(prompt)
  // console.log(response)
  const data = { "resturant employees" :[ 
    {"name":"Shyam", "email":"shyamjaiswal@gmail.com"},
    {"name":"Bob", "email":"bob32@gmail.com"},
    {"name":"Jai", "email":"jai87@gmail.com"}
  ]}
  const prompt = `
  Translate the following json object from JSON to an HTML
  table with column headers and title: ${data}
  `
  const response = await get_completion(prompt)
  console.log(response)
}

main();