import dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})

const get_completion = async (prompt, model="gpt-3.5-turbo") => {
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
  // const prompt = `
  //   Translate the following English text to Spanish: 
  //   "Hi, I would like to order a blender"
  // `
  // const response = await get_completion(prompt);
  // console.log(response);

  // const prompt = `
  // Tell me which language this is: 
  // "Combien coûte le lampadaire?"
  // `
  // const response = await get_completion(prompt);
  // console.log(response);

  // const prompt = `
  // Translate the following  text to French and Spanish
  // and English pirate: 
  // "I want to order a basketball"
  // `
  // const response = await get_completion(prompt)
  // console.log(response);

  const prompt = `
  Translate the following text to Spanish in both the formal and informal forms: 
'Would you like to order a pillow?'
  `
  const response = await get_completion(prompt)
  console.log(response);
}

main();