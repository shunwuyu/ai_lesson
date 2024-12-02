require('dotenv').config();
const { OpenAI } = require('openai')


const client = new OpenAI({
    // 凭证 密钥  算力收费  token
    apiKey: process.env.OPENAI_KEY,
    baseURL: 'https://api.chatanywhere.com.cn'
})

console.log(OpenAI);
console.log(process.env.OPENAI_KEY)

const generate_code = async (prompt) => {
    const chatCompletion = await client.chat.completions.create( 
        model="gpt-3.5-turbo", 
        messages=[ 
            {"role": "system", "content": "You are a helpful Javascript programming assistant."}, 
            {"role": "user", "content": prompt} 
        ] 
    ) 
    return response.choices[0].message.content
}

const  main = async () => {
    // const prompt = `请编写一个JS函数实现对数组求和。
    // 要求: 函数名为sum_list,接受一个数组作为参数 
    // 使用内置的reduce()函数实现数组求和 添加必要的注释,
    // 说明函数的输入输出 在函数末尾添加几个测试用例,并打印结果`
    // const generated_code = await generate_code(prompt)
    // console.log(generated_code);
    const response = await client.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        // prompt: '写一首描述春天的诗歌',
        prompt: '叮，我收到一条短信，显示我的招行里存入了五个亿。',
        suffix: '想想当初与好友一起创业的日子，真的像是在做梦一样。',
        temperature: 1,
        max_tokens: 2110,
        top_p: 1
    })
    console.log(response)
}

main()
