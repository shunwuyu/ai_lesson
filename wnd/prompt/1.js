require('dotenv').config();
const OpenAI = require('openai');

// 现在你可以像使用普通环境变量一样使用它
const openaiApiKey = process.env.OPENAI_KEY;
console.log(openaiApiKey, '////');

const client = new OpenAI({
    // 凭证 密钥  算力收费  token
    apiKey: openaiApiKey,
    baseURL: 'https://api.chatanywhere.tech/v1'
})


// 示例：打印出API Key以确认是否成功读取
// console.log(openaiApiKey);

async function getCompletion(prompt, model = "gpt-3.5-turbo") {
    try {
      const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0, // 控制输出的随机性，0表示更确定的输出
      });
  
      return response.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching completion:", error);
      throw error;
    }
}

// 使用示例
(async () => {
//     try {
    // 您应该提供尽可能清晰、具体的指示，以表达您希望模型执行的任务。\
    // 这将引导模型朝向所需的输出，并降低收到无关或不正确响应的可能性。\
    // 不要将写清晰的提示词与写简短的提示词混淆。\
    // 在许多情况下，更长的提示词可以为模型提供更多的清晰度和上下文信息，从而导致更详细和相关的输出。
// `
// const prompt = `
// 把用三个反引号括起来的文本总结成一句话。
// \`\`\`${text}\`\`\`
// `
//       const completion = await getCompletion(prompt);
//       console.log(completion);
//     } catch (error) {
//       console.error("An error occurred during the request:", error);
//     }

    // try {
    //     const prompt = `
    //     请生成包括书名、作者和类别的三本虚构书籍清单，\
    //     并以 JSON 格式提供，其中包含以下键:book_id、title、author、genre。
    //     `
    //     const completion = await getCompletion(prompt);
    //     console.log(completion)
    // } catch(error) {
    //     console.error("An error occurred during the request:", error);
    // }

//     try {
//         const text_1 = `
// 泡一杯茶很容易。首先，需要把水烧开。\
// 在等待期间，拿一个杯子并把茶包放进去。\
// 一旦水足够热，就把它倒在茶包上。\
// 等待一会儿，让茶叶浸泡。几分钟后，取出茶包。\
// 如果您愿意，可以加一些糖或牛奶调味。\
// 就这样，您可以享受一杯美味的茶了。
// `

// const prompt = `
// 您将获得由三个引号括起来的文本。\
// 如果它包含一系列的指令，则需要按照以下格式重新编写这些指令：

// 第一步 - ...
// 第二步 - …
// …
// 第N步 - …

// 如果文本中不包含一系列的指令，则直接写“未提供步骤”。

// \"\"\"${text_1}\"\"\"
// `   
//     const completion = await getCompletion(prompt);
//     console.log(completion)

//     } catch(error) {
//         console.error("An error occurred during the request:", error);
//     }

    // try {
    //     const prompt = `
    //     您的任务是以一致的风格回答问题。

    //     <孩子>: 教我耐心。

    //     <祖父母>: 挖出最深峡谷的河流源于一处不起眼的泉眼；最宏伟的交响乐从单一的音符开始；最复杂的挂毯以一根孤独的线开始编织。

    //     <孩子>: 教我韧性。
    //     `
    //     const response = await getCompletion(prompt);
    //     console.log(response)

    // } catch(error) {
    //     console.error("An error occurred during the request:", error);
    // }

    // try {
    //     const text = `
    //     在一个迷人的村庄里，兄妹杰克和吉尔出发去一个山顶井里打水。\
    //     他们一边唱着欢乐的歌，一边往上爬，\
    //     然而不幸降临——杰克绊了一块石头，从山上滚了下来，吉尔紧随其后。\
    //     虽然略有些摔伤，但他们还是回到了温馨的家中。\
    //     尽管出了这样的意外，他们的冒险精神依然没有减弱，继续充满愉悦地探索。
    //     `
    //     const prompt= `
    //     执行以下操作：
    //     1-用一句话概括下面用三个反引号括起来的文本。
    //     2-将摘要翻译成法语。
    //     3-在法语摘要中列出每个人名。
    //     4-输出一个 JSON 对象，其中包含以下键：French_summary，num_names。
        
    //     请用换行符分隔您的答案。
        
    //     Text:
    //     \`\`\`${text}\`\`\`
    //     `
    //     const response = await getCompletion(prompt);
    //     console.log(response)

    // } catch(error) {
    //     console.error("An error occurred during the request:", error);
    // }

    // try {
    //         const text = `
    //         在一个迷人的村庄里，兄妹杰克和吉尔出发去一个山顶井里打水。\
    //         他们一边唱着欢乐的歌，一边往上爬，\
    //         然而不幸降临——杰克绊了一块石头，从山上滚了下来，吉尔紧随其后。\
    //         虽然略有些摔伤，但他们还是回到了温馨的家中。\
    //         尽管出了这样的意外，他们的冒险精神依然没有减弱，继续充满愉悦地探索。
    //         `
    //         const prompt= `
    //         1-用一句话概括下面用<>括起来的文本。
    //         2-将摘要翻译成英语。
    //         3-在英语摘要中列出每个名称。
    //         4-输出一个 JSON 对象，其中包含以下键：English_summary，num_names。

    //         请使用以下格式：
    //         文本：<要总结的文本>
    //         摘要：<摘要>
    //         翻译：<摘要的翻译>
    //         名称：<英语摘要中的名称列表>
    //         输出 JSON：<带有 English_summary 和 num_names 的 JSON>
    //         Text: <${text}>
    //         `
    //         const response = await getCompletion(prompt);
    //         console.log(response)
    
    //     } catch(error) {
    //         console.error("An error occurred during the request:", error);
    //     }

    // try {
    //     const prompt = `
    //     判断学生的解决方案是否正确。

    //     问题:
    //     我正在建造一个太阳能发电站，需要帮助计算财务。
        
    //         土地费用为 100美元/平方英尺
    //         我可以以 250美元/平方英尺的价格购买太阳能电池板
    //         我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元
    //         作为平方英尺数的函数，首年运营的总费用是多少。
        
    //     学生的解决方案：
    //     设x为发电站的大小，单位为平方英尺。
    //     费用：
        
    //         土地费用：100x
    //         太阳能电池板费用：250x
    //         维护费用：100,000美元+100x
    //         总费用：100x+250x+100,000美元+100x=450x+100,000美元
    //     `
    //     const response = await getCompletion(prompt);
    //     console.log(response);

    // } catch(error) {
    //     console.error("An error occurred during the request:", error);
    // }

//     try {
//             const prompt = `
//             请判断学生的解决方案是否正确，请通过如下步骤解决这个问题：

// 步骤：
// 首先，自己解决问题，解决问题时列数学表达式。
// 然后将您的解决方案与学生的解决方案进行比较，并评估学生的解决方案是否正确。
// 在自己完成问题之前，请勿决定学生的解决方案是否正确。

// 使用以下格式：

// 问题：问题文本
// 学生的解决方案：学生的解决方案文本
// 实际解决方案和步骤：实际解决方案和步骤文本
// **学生的计算结果：学生的计算结果文本
// 实际计算结果：实际计算结果文本
// 学生的计算结果和实际计算结果是否相同：是或否
// 学生的解决方案和实际解决方案是否相同：是或否**
// 学生的成绩：正确或不正确

// 问题：
// 我正在建造一个太阳能发电站，需要帮助计算财务。
// - 土地费用为每平方英尺100美元
// - 我可以以每平方英尺250美元的价格购买太阳能电池板
// - 我已经谈判好了维护合同，每年需要支付固定的10万美元，并额外支付每平方英尺10美元
// 作为平方英尺数的函数，首年运营的总费用是多少。

// 学生的解决方案：

// 设x为发电站的大小，单位为平方英尺。
// 费用：
// 1. 土地费用：100x
// 2. 太阳能电池板费用：250x
// 3. 维护费用：100,000+100x
// 总费用：100x+250x+100,000+100x=450x+100,000

// 实际解决方案和步骤：
//             `
//             const response = await getCompletion(prompt);
//             console.log(response);
    
//         } catch(error) {
//             console.error("An error occurred during the request:", error);
//         }

})();
  