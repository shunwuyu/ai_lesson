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

const main = async () => {
  // const text = `
  //   您应该通过提供尽可能清晰和具体的指令来表达您希望模型做什么。
  //   这将引导模型实现所需的输出，并减少收到不相关或不正确的响应的机会。
  //   不要混淆编写清晰的提示和编写简短的提示。
  //   在许多情况下，较长的提示为模型提供了更清晰的上下文，从而可以产生更详细和相关的输出。
  // `
  // const prompt = `
  // 请将下面用三个引号括起来的文本总结为一个句子，30字内。
  // '''${text}'''
  // `
  // const result = await get_completion(prompt)
  // console.log(result);

  // const prompt = `
  //   Generate a list of three made-up book titles along \ 
  //   with their authors and genres. 
  //   Provide them in JSON format with the following keys: 
  //   book_id, title, author, genre.
  // `
  // const result = await get_completion(prompt)
  // console.log(result);


  // const text_1 = `
  // Making a cup of tea is easy! First, you need to get some \ 
  // water boiling. While that's happening, \ 
  // grab a cup and put a tea bag in it. Once the water is \ 
  // hot enough, just pour it over the tea bag. \ 
  // Let it sit for a bit so the tea can steep. After a \ 
  // few minutes, take out the tea bag. If you \ 
  // like, you can add some sugar or milk to taste. \ 
  // And that's it! You've got yourself a delicious \ 
  // cup of tea to enjoy.
  // `
  // const prompt = `
  // You will be provided with text delimited by triple quotes. 
  // If it contains a sequence of instructions, \ 
  // re-write those instructions in the following format:

  // Step 1 - ...
  // Step 2 - …
  // …
  // Step N - …

  // If the text does not contain a sequence of instructions, \ 
  // then simply write \"No steps provided.\"

  // \"\"\"${text_1}\"\"\"
  // `
  // const result = await get_completion(prompt)
  // console.log(result);

//   const text_2 = `
//   The sun is shining brightly today, and the birds are \
//   singing. It's a beautiful day to go for a \ 
//   walk in the park. The flowers are blooming, and the \ 
//   trees are swaying gently in the breeze. People \ 
//   are out and about, enjoying the lovely weather. \ 
//   Some are having picnics, while others are playing \ 
//   games or simply relaxing on the grass. It's a \ 
//   perfect day to spend time outdoors and appreciate the \ 
//   beauty of nature.
//   `
//   const prompt = `
//   You will be provided with text delimited by triple quotes. 
//   If it contains a sequence of instructions, \ 
//   re-write those instructions in the following format:

//   Step 1 - ...
//   Step 2 - …
//   …
//   Step N - …

//   If the text does not contain a sequence of instructions, \ 
//   then simply write \"No steps provided.\"

//   \"\"\"{text_2}\"\"\"
// `
//   const result = await get_completion(prompt)
//   console.log(result);
// const prompt = `
// Your task is to answer in a consistent style.

// : Teach me about patience.

// : The river that carves the deepest \ 
// valley flows from a modest spring; the \ 
// grandest symphony originates from a single note; \ 
// the most intricate tapestry begins with a solitary thread.

// : Teach me about resilience.
// `

// const response = await get_completion(prompt)
// console.log(response)

  // const text = `
  // In a charming village, siblings Jack and Jill set out on \ 
  // a quest to fetch water from a hilltop \ 
  // well. As they climbed, singing joyfully, misfortune \ 
  // struck—Jack tripped on a stone and tumbled \ 
  // down the hill, with Jill following suit. \ 
  // Though slightly battered, the pair returned home to \ 
  // comforting embraces. Despite the mishap, \ 
  // their adventurous spirits remained undimmed, and they \ 
  // continued exploring with delight.
  // `
  // const prompt_1 = `
  // Perform the following actions: 
  // 1 - Summarize the following text delimited by triple \
  // single quotes with 1 sentence.
  // 2 - Translate the summary into French.
  // 3 - List each name in the French summary.
  // 4 - Output a json object that contains the following \
  // keys: french_summary, num_names.

  // Separate your answers with line breaks.

  // Text:
  // '''${text}'''
  // `
  // const response = await get_completion(prompt_1)
  // console.log(response)

  const prompt = `
  Determine if the student's solution is correct or not.
  
  Question:
  I'm building a solar power installation and I need \
   help working out the financials. 
  - Land costs 
  250 / square foot
  - I negotiated a contract for maintenance that will cost \ 
  me a flat 
  10 / square \
  foot
  What is the total cost for the first year of operations 
  as a function of the number of square feet.
  
  Student's Solution:
  Let x be the size of the installation in square feet.
  Costs:
  1. Land cost: 100x
  2. Solar panel cost: 250x
  3. Maintenance cost: 100,000 + 100x
  Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
  `
  const response = await get_completion(prompt)
  console.log(response)
}

main();