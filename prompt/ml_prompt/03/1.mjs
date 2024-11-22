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

  const prod_review = `
  我女儿生日时买了这个熊猫毛绒玩具，她很喜欢，到处都带着。
  它柔软、超级可爱，脸看起来很友好。
  不过，相对于我付的价格来说，它有点小。
  我想，同样的价格，也许还有其他更大的选择。
  它比预期早到了一天，所以我有机会自己玩了一会儿，然后才把它送给她。
  `;

  // const prompt = `
  // 您的任务是生成来自电子商务网站的产品评论的简短摘要。
  // 使用中文，总结下面用双引号分隔的评论，最多 30 个字。

  // 评论: "${prod_review}"
  // `


  // focus on shipping 
  // const prompt = `
  // 您的任务是生成来自电子商务网站的产品评论的简短摘要，以便向运输部门提供反馈。

  // 使用中文，总结下面用双引号分隔的评论，最多 30 个字。并重点关注任何提及产品运输和交付的方面。 

  // 评论: "${prod_review}"
  // `

  // const prompt = `
  // 您的任务是生成电子商务网站上产品评论的简短摘要，以便向负责确定产品价格的定价部门提供反馈。

  // 使用中文，总结下面用双引号分隔的评论，最多 30 个字。并关注与价格和感知价值相关的任何方面。 

  // 评论: "${prod_review}"
  // `
  // extract 代替总结
  const prompt = `
    您的任务是从电子商务网站的产品评论中提取相关信息，以便向运输部门提供反馈。
    从下面的评论中，用双引号分隔，
    提取与运输和交付相关的信息。限制为 30 个字。
    评论: "${prod_review}"
  `

  const response = await get_completion(prompt)
  console.log(response)

  // 多条评论
  // const review_1 = prod_review

  // const review_2 = `
  // 需要一盏漂亮的灯放在我的卧室，而这盏灯有额外的存储空间，
  // 而且价格也不算太高。很快就收到了——两天就到了。
  // 灯的灯串在运输过程中断了，公司很高兴地给我寄了一根新的。
  // 几天内就到了。组装起来很容易。
  // 后来我有一个零件丢失了，所以我联系了他们的支持人员，
  // 他们很快就给我找到了丢失的零件！在我看来，这是一家关心客户和产品的好公司。
  // `
  // const review_3 = `
  // 我的牙科保健师推荐了一把电动牙刷
  // 这就是我得到这个的原因。电池寿命似乎到目前为止，相当令人印象深刻。
  // 初次充电后在第一周将充电器插上电源
  // 调节电池，我拔下充电器 最近每天刷牙两次
  // 3周的费用都是一样的。但牙刷头
  // 太小了。我见过比它大的婴儿牙刷
  // 这个。我希望头部能更大一些
  // 长鬃毛可以更好地夹在牙齿之间，因为这一个没有。
  // 总的来说，如果你能在50美元左右买到这个，
  // 这是一笔好交易。制造商的替换头相当昂贵，
  // 但你可以买到价格更合理的通用头。
  // 这把牙刷让我觉得我每天都在看牙医。
  // 我的牙齿感觉非常干净！
  // `
  // const reviews = [review_1, review_2, review_3]

  // for (const review of reviews) {
  //   const prompt = `
  //     您的任务是生成来自电子商务网站的产品评论的简短摘要。
  //     从下面的评论中，用双引号分隔，
  //     总结下面用双引号分隔的评论。限制为 30 个字。
  //     评论: "${review}"
  //   `
  //   const response = await get_completion(prompt)
  //   console.log(response)
  // }
}

main();