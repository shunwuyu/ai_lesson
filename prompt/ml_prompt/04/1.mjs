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

const main = async () => {
  const lamp_review = `
  需要一盏漂亮的灯放在我的卧室，这盏灯有额外的存储空间，而且价格也不太高。 
  很快就收到了。我们灯的灯串在运输过程中断了，公司很乐意给我们寄来一根新的。
  几天之内就到了。组装起来很容易。
  我缺少一个零件，所以我联系了他们的支持人员，他们很快就给我找到了缺失的零件！ 
  在我看来，Lumina 是一家关心客户和产品的好公司！！
  `
  // const prompt = `
  // 以下产品评论的情绪是什么, 
  // 以三个反引号分隔

  // 评论内容: '''${lamp_review}'''
  // `

  // 给些示例
  // const prompt = `
  // 以下产品评论的情绪是什么, 
  // 以三个反引号分隔

  // 请用一个词来回答，可以是“积极”或“消极”。

  // 评论内容: '''${lamp_review}'''
  // `

  // const prompt = `
  //  以下产品评论的情绪是什么, 
  //  以三个反引号分隔

  //  确定以下评论作者表达的情感列表。
  //  列表中最多包含五项。将您的答案格式化为以逗号分隔的列表

  //  评论内容: '''${lamp_review}'''
  // `

  // const prompt = `
  //   以下评论的作者是否在表达愤怒？
  //   评论以三个反引号分隔。
  //   请回答是或否。

  //   评论内容: '''${lamp_review}'''
  // `

  // const prompt = `
  // 从评论文本中识别以下项目：
  // - 评论者购买的商品
  // - 制造商品的公司

  // 评论以三个反引号分隔。
  // 将您的回复格式化为 JSON 对象，其中“商品”和“品牌”作为键。
  // 如果信息不存在，请使用“未知”
  // 作为值。
  // 让您的回复尽可能简短。

  // 评论文本: '''${lamp_review}'''
  // `

  // 一起搞
  // const prompt = `
  // 从评论文本中识别以下项目：
  // - 情绪（正面或负面）
  // - 评论者是否表达愤怒？（真或假）
  // - 评论者购买的商品
  // - 制造商品的公司

  // 评论以三个反引号分隔。
  // 将您的回复格式化为 JSON 对象，其中
  // “情绪”、“愤怒”、“商品”和“品牌”作为键。
  // 如果信息不存在，请使用“未知”
  // 作为值。
  // 让您的回复尽可能简短。
  // 将愤怒值格式化为布尔值。

  // 评论文本: '''${lamp_review}'''
  // `


  // const response = await get_completion(prompt)
  // console.log(response)

  const story = `
  在政府最近进行的一项调查中，公共部门员工被要求对他们所工作部门的满意度进行评分。
  结果显示，NASA 是最受欢迎的部门，满意度高达 95%。
  NASA 的一名员工 John Smith 对调查结果表示：“NASA 名列前茅，我并不感到惊讶。
  这是一个工作的好地方，有出色的人才和令人难以置信的机会。
  我很自豪能成为这样一个创新组织的一员。
  ”NASA 管理团队也对调查结果表示欢迎，
  主任 Tom Johnson 表示：“我们很高兴听到我们的员工对他们在 NASA 的工作感到满意。
  我们拥有一支才华横溢、敬业的团队，他们不知疲倦地工作以实现我们的目标，看到他们的辛勤工作得到回报真是太好了。”
  调查还显示，社会保障署的满意度评分最低，只有 45% 的员工表示对工作感到满意。
  政府已承诺解决员工在调查中提出的担忧，并努力提高所有部门的工作满意度。
  `
  const prompt = `
  确定以下文本中正在讨论的五个主题，这些主题由三个反引号分隔。

  使每个项目长度为一个或两个单词。

  将您的回复格式化为以逗号分隔的项目列表。

  Text sample: '''${story}'''
  `

  const response = await get_completion(prompt)
  console.log(response)
}

main();