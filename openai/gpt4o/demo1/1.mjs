import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'sk-g2aGXLfj9ScHVMH1RumFwM9Mc2nS0KBjrP4uvwMBmNAYRRkp', // This is the default and can be omitted
    baseURL: 'https://api.302.ai/v1'
});


const main = async () => {
    // const response = await client.chat.completions.create({
    //     model: "gpt-4o",
    //     messages: [
    //         {
    //             role: "user",
    //             content: "你好GPT!"
    //         }
    //     ],
    //     max_tokens:300
    // })
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    { "type":"text", "text":"请描述以下图片的内容"},
                    { "type":"image_url", "image_url":{"url":"https://img.huxiucdn.com/img/minitopic/202406/25/084826659075.jpg?imageView2/1/w/512/h/512/|imageMogr2/strip/interlace/1/quality/85"} }
                ]
            }
        ],
        max_tokens:300
    })
    console.log(response.choices[0].message.content)
}

main()