import dotenv from 'dotenv'
import OpenAI from 'openai';

dotenv.config({path: '.env'});

const client = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    baseURL:process.env.OPENAI_BASE_URL
})



const get_completion_from_messages = async (messages, model="gpt-4o", temperature = 0) => {
    const response = await client.chat.completions.create({
        model: model,
        messages: messages,
        temperature: temperature,
    });
    return response.choices[0].message.content;
} 

// 
const main = async () => {
  // const messages =  [  
  //   {'role':'system', 'content':'You are an assistant that speaks like Shakespeare.'},    
  //   {'role':'user', 'content':'tell me a joke'},   
  //   {'role':'assistant', 'content':'Why did the chicken cross the road'},   
  //   {'role':'user', 'content':'I don\'t know'}  ]
  // const response = await get_completion_from_messages(messages)
  // console.log(response)

  // const messages =  [  
  //   {'role':'system', 'content':'You are friendly chatbot.'},    
  //   {'role':'user', 'content':'Hi, my name is Isa'}  ]
  // const messages =  [  
  //   {'role':'system', 'content':'You are friendly chatbot.'},    
  //   {'role':'user', 'content':'Yes,  can you remind me, What is my name?'}  ]
  const messages =  [  
    {'role':'system', 'content':'You are friendly chatbot.'},
    {'role':'user', 'content':'Hi, my name is Isa'},
    {'role':'assistant', 'content': "Hi Isa! It's nice to meet you. \
    Is there anything I can help you with today?"},
    {'role':'user', 'content':'Yes, you can remind me, What is my name?'}  ]
  const response = await get_completion_from_messages(messages)
  console.log(response)
}

main();