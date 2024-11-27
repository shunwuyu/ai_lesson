// universal translator
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
  const user_messages = [
    "La performance du système est plus lente que d'habitude.",  //系统的性能比平时慢         
    "Mi monitor tiene píxeles que no se iluminan.",              //我的显示器有些像素点不亮。
    "Il mio mouse non funziona",                                // 我的鼠标坏了
    "Mój klawisz Ctrl jest zepsuty",                            // 我的Ctrl键坏了
    "我的屏幕在闪烁"                    
  ]
  
  for(let issue of user_messages) {
    const prompt = `
      Tell me what language this is: "${issue}"
    `
    const lang = await get_completion(prompt)
    console.log(`Original message (${lang}): ${issue}`)

    const prompt2 = `
    Translate the following  text to chinese: "${issue}"
    `
    const response = await get_completion(prompt2)
    console.log(response)
  }
}

main();