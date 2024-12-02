import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({
    path:'.env'
})

const client = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    baseURL:process.env.BASE_URL
});

const saleData = `销售数据:
日期,产品,销量,单价,总收入
2023-01-01,iPhone 13,100,6000,600000
2023-01-01,iPhone 14,50,8000,400000
2023-01-02,iPhone 13,80,6000,480000
2023-01-02,iPhone 14,60,8000,480000
2023-01-03,iPhone 13,120,5800,696000
2023-01-03,iPhone 14,80,7800,624000
`

const genSaleReport = async (reference_data, query) => {
    const prompt = `
    You are an AI assistant that generates sales reports based on the given data.
    Here is the sales data:\n ${reference_data}\n\n
    Please generate a report to answer the following question:\n
    ${query}
    `
    let response = await client.completions.create({
        model: "gpt-3.5-turbo-instruct",
        max_tokens:1000,
        temperature:0.0,
        prompt
    })

    return response.choices[0].text
}

// console.log(await genSaleReport(saleData, '根据上述销售数据,计算iPhone 13和iPhone 14的总销量各是多少?'))
console.log(await genSaleReport(saleData, '根据上述销售数据,哪个产品的总收入更高?高多少?'))




