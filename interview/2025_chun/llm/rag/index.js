// RAG 应用 - 基于课程信息回答问题
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config();

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

// 读取课程信息文件
function readCourseInfo() {
  try {
    const filePath = path.join(__dirname, '课程信息.txt');
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('读取课程信息文件失败:', error);
    return '';
  }
}

/**
 * RAG 问答函数 - 根据课程信息回答问题
 * @param {string} question - 用户提问
 * @returns {Promise<string>} - 回答结果
 */
async function answerQuestion(question) {
  // 获取课程信息作为上下文
  const courseInfo = readCourseInfo();
  
  if (!courseInfo) {
    return '无法获取课程信息，请确保课程信息.txt文件存在且有内容';
  }

  try {
    // 构建 prompt
    const prompt = `
你是一个课程助手，请根据以下课程信息回答问题。
只回答与课程信息相关的内容，如果问题与课程无关，请礼貌地说明你只能回答与课程相关的问题。

课程信息:
${courseInfo}

问题: ${question}
`;

    // 调用 OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 可以根据需要更换模型
      messages: [
        { role: "system", content: "你是一个专业的课程助手，根据课程信息回答问题。" },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('调用 OpenAI API 失败:', error);
    return '抱歉，处理您的问题时出现错误，请稍后再试';
  }
}



  const testQuestion = "有多少们课程？";
  
  answerQuestion(testQuestion)
    .then(answer => {
      console.log("问题:", testQuestion);
      console.log("回答:", answer);
    })
    .catch(error => {
      console.error("发生错误:", error);
    });
