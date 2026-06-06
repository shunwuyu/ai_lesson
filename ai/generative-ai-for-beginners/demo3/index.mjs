import {
  getCompletion,
  // genImage
} from "./completion.mjs";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // const prompt = '请用一句话解释什么是模块化编程';
  // const reply = await getCompletion(prompt);
  // console.log('\nAI：', reply);
  //情感推断与信息提取  用户的反馈，通过反馈识别的情绪很重要的， 推荐商品或风控
  // 情感分类  Sentiment Classification
  const lamp_review_zh = `
  我需要一盏漂亮的卧室灯，这款灯具有额外的储物功能，价格也不算太高。\
  我很快就收到了它。在运输过程中，我们的灯绳断了，但是公司很乐意寄送了一个新的。\
  几天后就收到了。这款灯很容易组装。我发现少了一个零件，于是联系了他们的客服，他们很快就给我寄来了缺失的零件！\
  在我看来，Lumina 是一家非常关心顾客和产品的优秀公司！
  `
  // 现在让我们来编写一个 Prompt 来分类这个评论的情感。如果我想让系统告诉我这个评论的情感是什么，
  // 只需要编写 “以下产品评论的情感是什么” 这个 Prompt ，加上通常的分隔符和评论文本等等。

  // const prompt = `
  // 以下用三个反引号分隔的产品评论的情感是什么？

  // 评论文本: \`\`\`${lamp_review_zh}\`\`\`
  // `
  // const reply = await getCompletion(prompt);
  // console.log('\nAI：', reply);
  //如果你想要给出更简洁的答案，以便更容易进行后处理，可以在上述 Prompt 基础上添加另一个指令：
  //用一个单词回答：「正面」或「负面」。 便于分拣
  //这样就只会打印出 “正面” 这个单词，这使得输出更加统一，方便后续处理。
  // few shot 
  // const prompt = `
  // 以下用三个反引号分隔的产品评论的情感是什么？

  // 用一个单词回答：「正面」或「负面」。

  // 评论文本: \`\`\`${lamp_review_zh}\`\`\`
  // `
  // const reply = await getCompletion(prompt);
  // console.log('\nAI：', reply);
  //识别情感类型 细化 专业 打标签 用户画像
  //模型识别出评论作者所表达的情感，并归纳为列表，不超过五项
  // const prompt = `
  // 识别以下评论的作者表达的情感。包含不超过五个项目。将答案格式化为以逗号分隔的单词列表。
  // 评论文本: \`\`\`${lamp_review_zh}\`\`\`
  // `
  // const reply = await getCompletion(prompt)
  // console.log('\nAI：', reply);

  // 识别愤怒 舆情部门
  // 对于很多企业来说，了解某个顾客是否非常生气很重要。
  // 让客户支持或客户成功团队联系客户以了解情况，并为客户解决问题。
  // 准确
  // const prompt = `
  // 以下评论的作者是否表达了愤怒？评论用三个反引号分隔。给出是或否的答案。
  // 评论文本: \`\`\`${lamp_review_zh}\`\`\`
  // `
  // const reply = await getCompletion(prompt)
  // console.log('\nAI：', reply);
  // 商品信息提取
  // 信息提取是自然语言处理（NLP）的一部分，与从文本中提取你想要知道的某些事物相关。
  // 因此，在这个 Prompt 中，我要求它识别以下内容：购买物品和制造物品的公司名称。
  // 同样，如果你试图总结在线购物电子商务网站的许多评论，对于这些评论来说，弄清楚是什么物品、谁制造了该物品，
  // 弄清楚积极和消极的情感，有助于追踪特定物品或制造商收获的用户情感趋势。
//   const prompt = `
// 从评论文本中识别以下项目：
// - 评论者购买的物品
// - 制造该物品的公司

// 评论文本用三个反引号分隔。将你的响应格式化为以 “物品” 和 “品牌” 为键的 JSON 对象。
// 如果信息不存在，请使用 “未知” 作为值。
// 让你的回应尽可能简短。
  
// 评论文本: \`\`\`${lamp_review_zh}\`\`\`
// `
//   const response = await getCompletion(prompt)
//   console.log(response)
  // 综合完成任务 分步骤 
  // 提取上述所有信息使用了 3 或 4 个 Prompt ，但实际上可以编写单个 Prompt 来同时提取所有这些信息。
//   const prompt = `
// 从评论文本中识别以下项目：
// - 情绪（正面或负面）
// - 审稿人是否表达了愤怒？（是或否）
// - 评论者购买的物品
// - 制造该物品的公司

// 评论用三个反引号分隔。将您的响应格式化为 JSON 对象，以 “Sentiment”、“Anger”、“Item” 和 “Brand” 作为键。
// 如果信息不存在，请使用 “未知” 作为值。
// 让你的回应尽可能简短。
// 将 Anger 值格式化为布尔值。

// 评论文本: \`\`\`${lamp_review_zh}\`\`\`
// `
//   const response = await getCompletion(prompt)
//   console.log(response)
  // 主题推断
  // 大型语言模型的另一个很酷的应用是推断主题。给定一段长文本，这段文本是关于什么的？有什么话题？
  const story_zh = `
  在政府最近进行的一项调查中，要求公共部门的员工对他们所在部门的满意度进行评分。
调查结果显示，NASA 是最受欢迎的部门，满意度为 95％。

一位 NASA 员工 John Smith 对这一发现发表了评论，他表示：
“我对 NASA 排名第一并不感到惊讶。这是一个与了不起的人们和令人难以置信的机会共事的好地方。我为成为这样一个创新组织的一员感到自豪。”

NASA 的管理团队也对这一结果表示欢迎，主管 Tom Johnson 表示：
“我们很高兴听到我们的员工对 NASA 的工作感到满意。
我们拥有一支才华横溢、忠诚敬业的团队，他们为实现我们的目标不懈努力，看到他们的辛勤工作得到回报是太棒了。”

调查还显示，社会保障管理局的满意度最低，只有 45％的员工表示他们对工作满意。
政府承诺解决调查中员工提出的问题，并努力提高所有部门的工作满意度。
  `
//   const prompt = `
// 确定以下给定文本中讨论的五个主题。

// 每个主题用1-2个单词概括。

// 输出时用逗号分割每个主题。

// 给定文本: \`\`\`${story_zh}\`\`\`

// `

  // 为特定主题制作新闻提醒
  //假设我们想弄清楚，针对一篇新闻文章，其中涵盖了哪些主题。
  const topic_list = [
    "美国国家航空航天局", "地方政府", "工程", 
    "员工满意度", "联邦政府"
  ]
//   const prompt = `
// 判断主题列表中的每一项是否是给定文本中的一个话题，

// 以列表的形式给出答案，每个主题用 0 或 1。

// 主题列表：${topic_list.join(", ")}

// 给定文本: \`\`\`${story_zh}\`\`\`
// `
  // 仅用几分钟时间，我们就可以构建多个用于对文本进行推理的系统，而以前则需要熟练的机器学习开发人员数天甚至数周的时间。
  // 这非常令人兴奋，无论是对于熟练的机器学习开发人员，还是对于新手来说，都可以使用 Prompt 来非常快速地构建和开始相当复杂的自然语言处理任务。
  
  // nlp 有摘要任务（Summarization）：提炼原文关键信息，精简生成简短概括文本。
// 以商品评论的总结任务为例：对于电商平台来说，网站上往往存在着海量的商品评论，这些评论反映了所有客户的想法。
// 如果我们拥有一个工具去概括这些海量、冗长的评论，便能够快速地浏览更多评论，洞悉客户的偏好，
// // 从而指导平台与商家提供更优质的服务。
  const prod_review_zh = `
这个熊猫公仔是我给女儿的生日礼物，她很喜欢，去哪都带着。
公仔很软，超级可爱，面部表情也很和善。但是相比于价钱来说，
它有点小，我感觉在别的地方用同样的价钱能买到更大的。
快递比预期提前了一天到货，所以在送给女儿之前，我自己玩了会。
`
//   const prompt = `
// 您的任务是从电子商务网站上生成一个产品评论的简短摘要。

// 请对三个反引号之间的评论文本进行概括，最多30个词汇。

// 评论: \`\`\`${prod_review_zh}\`\`\`
// `

  // 设置关键角度侧重
// 有时，针对不同的业务，我们对文本的侧重会有所不同。例如对于商品评论文本，
// 物流会更关心运输时效，商家更加关心价格与商品质量，平台更关心整体服务体验。
// 可以看到，输出结果以“快递提前一天到货”开头，体现了对于快递效率的侧重。

//   const prompt = `
// 您的任务是从电子商务网站上生成一个产品评论的简短摘要。

// 请对三个反引号之间的评论文本进行概括，最多30个词汇，并且聚焦在产品运输上。

// 评论: \`\`\`${prod_review_zh}\`\`\`
// `
//   const prompt = `
// 您的任务是从电子商务网站上生成一个产品评论的简短摘要。

// 请对三个反引号之间的评论文本进行概括，最多30个词汇，并且聚焦在产品价格和质量上。

// 评论: \`\`\`${prod_review_zh}\`\`\`
// `
  // 关键信息提取
  // 如果我们只想要提取某一角度的信息，并过滤掉其他所有信息，则可以要求 LLM 进行“文本提取( Extract )”而非“概括( Summarize )”
  // 文本提取也是nlp 的核心任务
//   const prompt = `
// 您的任务是从电子商务网站上的产品评论中提取相关信息。

// 请从以下三个反引号之间的评论文本中提取产品运输相关的信息，最多30个词汇。

// 评论: \`\`\`${prod_review_zh}\`\`\`
// ` 

// 多条评论
const review_1 = prod_review_zh

// review for a standing lamp
const review_2 = `
我想为我的卧室找一个漂亮的灯，这款灯还有额外的存储空间，价格也不太高。\
购买后很快就收到了，两天就送到了。但在运输过程中，灯的拉链断了，公司态度\
很好，发来了一条新的。新的拉链也在几天内就到了。这个灯非常容易装配。后来，我\
发现缺少一个部分，所以我联系了他们的客户支持，他们很快就给我寄来了缺失的部件\
！我觉得这是一家非常关心他们的客户和产品的好公司。
`

// review for an electric toothbrush
const review_3 = `
我的牙科卫生师推荐我使用电动牙刷，这就是我购买这款牙刷的原因。目前为止，我发现电池的\
续航时间颇为令人印象深刻。在初次充电并在第一周保持充电器插头插入以调节电池状态之后，我\
已经将充电器拔掉，并在过去的3周里，每天两次刷牙都使用同一次充电。然而，这款牙刷的刷头实\
在太小了。我见过的婴儿牙刷都比这个大。我希望牙刷头能做得更大一些，搭配不同长度的刷毛更好\
地清洁牙齿间缝，因为现有的无法做到这一点。总的来说，如果你能以大约50美元的价格购入这款电动\
牙刷，那它就物超所值。厂家配套的替换刷头价格相当昂贵，但你可以买到价格更为合理的通用款。\
使用这款牙刷让我感觉像每天都去看了牙医一样，我的牙齿感觉洁净如新！
`

// review for a blender
const review_4 = `
他们还在11月把17件套系统以大约$49的优惠价格销售，几乎是五折。但不明原因（轻易就可以归咎为价格欺诈）\
在到了12月第二周，同一套系统的价格一下儿飙升到了$70-$89之间。11件套系统的价格也从之前的优惠价$29上\
升了大概$10。看上去还算公道，但如果你仔细观察底部，会发现刀片锁定的部位相比几年前的版本要略逊一筹，所\
以我打算非常小心翼翼地使用（例如，我会将像豆子、冰块、大米之类的硬质食材先用搅拌机压碎，然后调到我需要\
的份量，再用打发刀片研磨成更细的粉状，制作冰沙时我首选交叉刀片，如果需要更细腻些或者少些浆糊状，我会换成\
平刀）。在制作果昔时，把将要用的水果和蔬菜切片冷冻是个小技巧（如果你打算用菠菜，要先稍微焖炖软，再冷冻，\
制作雪葩时，用一个小到中号的食品加工器就行）这样就不用或者很少加冰块到你的果昔了。大约一年后，电机开始发出\
一些可疑的声音。我联系了客服，但保修期已经过期，所以我只好另购一台。友情提示：这类产品的整体质量都在下滑，\
所以他们更多的是利用品牌知名度和消费者的忠诚度来保持销售。我在两天之后就收到了它。
`

// const reviews = [review_1, review_2, review_3, review_4]
//   for (let review of reviews) {
//     const prompt = `
//     你的任务是从电子商务网站上的产品评论中提取相关信息。

//     请对三个反引号之间的评论文本进行概括，最多20个词汇。

//     评论文本: \`\`\`${review}\`\`\`
//     `
//     const response = await getCompletion(prompt)
//     console.log(response, "\n");
//   }


//   const prompt = `
// 将以下中文翻译成西班牙语: 
// \`\`\`您好，我想订购一个搅拌机。\`\`\`
// `
// const prompt = `
// 请告诉我以下文本是什么语种: 
// \`\`\`Combien coûte le lampadaire?\`\`\`
// `
// 多语种翻译
// const prompt = `
// 请将以下文本分别翻译成中文、英文、法语和西班牙语: 
// \`\`\`I want to order a basketball.\`\`\`
// `
// 语气转换
// const prompt = `
// 请将以下文本翻译成中文，分别展示成正式与非正式两种语气: 
// \`\`\`Would you like to order a pillow?\`\`\`
// `
// const response = await getCompletion(prompt)
// console.log(response)
  
  // 通用翻译器
// 随着全球化与跨境商务的发展，交流的用户可能来自各个不同的国家，使用不同的语言，因此我们需要一个通用翻译器，
// 识别各个消息的语种，并翻译成目标用户的母语，从而实现更方便的跨国交流。
  // const user_messages = [
  // "La performance du système est plus lente que d'habitude.",  // System performance is slower than normal         
  // "Mi monitor tiene píxeles que no se iluminan.",              // My monitor has pixels that are not lighting
  // "Il mio mouse non funziona",                                 // My mouse is not working
  // "Mój klawisz Ctrl jest zepsuty",                             // My keyboard has a broken control key
  // "我的屏幕在闪烁"                                             // My screen is flashing
  // ];
  // for (let message of user_messages) {
  //   await sleep(2000);
  //   const prompt = `告诉我以下文本是什么语种，直接输出语种，如法语，无需输出标点符号: \`\`\`${message}\`\`\``
  //   const response = await getCompletion(prompt)
  //   console.log(response, "\n");
  //   const prompt2 = `
  //   将以下消息分别翻译成英文和中文，并写成
  //   中文翻译：xxx
  //   英文翻译：xxx
  //   的格式：
  //   \`\`\`${message}\`\`\`
  //   `
  //   const response2 = await getCompletion(prompt2)
  //   console.log(response2, "\n=========================================")
  // }

  // 语气与写作风格调整
// 写作的语气往往会根据受众对象而有所调整。例如，对于工作邮件，我们常常需要使用正式语气与书面用词，
// 而对同龄朋友的微信聊天，可能更多地会使用轻松、口语化的语气。
  // const prompt = `
  // 将以下文本翻译成商务信函的格式: 
  // \`\`\`小老弟，我小羊，上回你说咱部门要采购的显示器是多少寸来着？\`\`\`
  // `

  // 文件格式转换

// ChatGPT非常擅长不同格式之间的转换，例如JSON到HTML、XML、Markdown等。
// 在下述例子中，我们有一个包含餐厅员工姓名和电子邮件的列表的JSON，我们希望将其从JSON转换为HTML。

// const data_json = { "resturant employees" :[ 
//     {"name":"Shyam", "email":"shyamjaiswal@gmail.com"},
//     {"name":"Bob", "email":"bob32@gmail.com"},
//     {"name":"Jai", "email":"jai87@gmail.com"}
// ]}


//   const prompt = `
//   将以下数据从JSON转换为HTML表格，保留表格标题和列名：${data_json}
//   `

  // 拼写及语法纠正
  // 拼写及语法的检查与纠正是一个十分常见的需求，特别是使用非母语语言，例如，在论坛发帖时，或发表英文论文时，校对是一件十分重要的事情。
  // 下述例子给定了一个句子列表，其中有些句子存在拼写或语法问题，有些则没有，我们循环遍历每个句子，要求模型校对文本，
  // 如果正确则输出“未发现错误”，如果错误则输出纠正后的文本。
  // const text = [ 
  // "The girl with the black and white puppies have a ball.",  // The girl has a ball.
  // "Yolanda has her notebook.", // ok
  // "Its going to be a long day. Does the car need it’s oil changed?",  // Homonyms
  // "Their goes my freedom. There going to bring they’re suitcases.",  // Homonyms
  // "Your going to need you’re notebook.",  // Homonyms
  // "That medicine effects my ability to sleep. Have you heard of the butterfly affect?", // Homonyms
  // "This phrase is to cherck chatGPT for spelling abilitty"  // spelling
  // ]
  // const response = await getCompletion(prompt)
  // console.log(response)

  // for (let item of text) {
  //   sleep(2000)
  //   const prompt = `请校对并更正以下文本，注意纠正文本保持原始语种，无需输出原始文本。
  //   如果您没有发现任何错误，请说“未发现错误”。
    
  //   例如：
  //   输入：I are happy.
  //   输出：I am happy.
  //   \`\`\`${item}\`\`\`
  //   `

  //   const response =await getCompletion(prompt)
  //   console.log(response)
  // }

//   const text = `
// Got this for my daughter for her birthday cuz she keeps taking \
// mine from my room.  Yes, adults also like pandas too.  She takes \
// it everywhere with her, and it's super soft and cute.  One of the \
// ears is a bit lower than the other, and I don't think that was \
// designed to be asymmetrical. It's a bit small for what I paid for it \
// though. I think there might be other options that are bigger for \
// the same price.  It arrived a day earlier than expected, so I got \
// to play with it myself before I gave it to my daughter.
// `
//   const prompt = `
// 针对以下三个反引号之间的英文评论文本，
// 首先进行拼写及语法纠错，
// 然后将其转化成中文，
// 再将其转化成优质淘宝评论的风格，从各种角度出发，分别说明产品的优点与缺点，并进行总结。
// 润色一下描述，使评论更具有吸引力。
// 输出结果格式为：
// 【优点】xxx
// 【缺点】xxx
// 【总结】xxx
// 注意，只需填写xxx部分，并分段输出。
// 将结果输出成Markdown格式。
// \`\`\`{text}\`\`\`
// `

// 扩展是将短文本（例如一组说明或主题列表）输入到大型语言模型中，让模型生成更长的文本（例如基于某个主题的电子邮件或论文）。
// 定制客户邮件
//  我们将根据客户评价和情感，针对性写自动回复邮件。因此，我们将给定客户评价和情感，使用 LLM 针对性生成响应，
// 即根据客户评价和评论情感生成定制电子邮件。
// 我们首先给出一个示例，包括一个评论及对应的情感。
// 我们可以在推理那章学习到如何对一个评论判断其情感倾向
const sentiment = "negative"

// 一个产品的评价
const review = `
他们在11月份的季节性销售期间以约49美元的价格出售17件套装，折扣约为一半。\
但由于某些原因（可能是价格欺诈），到了12月第二周，同样的套装价格全都涨到了70美元到89美元不等。\
11件套装的价格也上涨了大约10美元左右。\
虽然外观看起来还可以，但基座上锁定刀片的部分看起来不如几年前的早期版本那么好。\
不过我打算非常温柔地使用它，例如，\
我会先在搅拌机中将像豆子、冰、米饭等硬物研磨，然后再制成所需的份量，\
切换到打蛋器制作更细的面粉，或者在制作冰沙时先使用交叉切割刀片，然后使用平面刀片制作更细/不粘的效果。\
制作冰沙时，特别提示：\
将水果和蔬菜切碎并冷冻（如果使用菠菜，则轻轻煮软菠菜，然后冷冻直到使用；\
如果制作果酱，则使用小到中号的食品处理器），这样可以避免在制作冰沙时添加太多冰块。\
大约一年后，电机发出奇怪的噪音，我打电话给客服，但保修已经过期了，所以我不得不再买一个。\
总的来说，这些产品的总体质量已经下降，因此它们依靠品牌认可和消费者忠诚度来维持销售。\
货物在两天内到达。
`
const prompt = `
你是一位客户服务的AI助手。
你的任务是给一位重要客户发送邮件回复。
根据客户通过\`\`\`分隔的评价，生成回复以感谢客户的评价。提醒模型使用评价中的具体细节
用简明而专业的语气写信。
作为“AI客户代理”签署电子邮件。
客户评论：
\`\`\`${review}\`\`\`
评论情感：${sentiment}
`

var response = await getCompletion(prompt)
console.log(response)
}

main();
