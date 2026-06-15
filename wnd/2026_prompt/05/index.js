import 'dotenv/config';
import { OpenAI } from 'openai';
import fs from 'fs';
import csv from 'csv-parser';

// 1. 初始化AI客户端
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL
});

// 存储解析后的CSV数据
let runningData = [];

// 2. 读取CSV文件
function readCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        runningData.push(row);
      })
      .on('end', () => {
        resolve(runningData);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}


// 3. 封装AI分析函数
async function analyzeRunningData(dataStr) {
  const prompt = `
  你是专业跑步训练计划分析师，严格基于下方\`\`\`内的半程马拉松训练计划CSV数据，禁止编造内容：
  1. 统计全周期总计划跑步里程、总计划运动时长、平均目标配速、各训练周计划里程分布
  2. 分析不同跑步类型（轻松跑、长距离跑、节奏跑、间歇跑等）的计划占比、负荷安排与半马备赛目标的匹配度
  3. 结合完整训练周期，评价计划的科学性、负荷递进合理性、备赛目标适配性
  4. 给出3条针对性的训练计划优化调整建议
  输出格式：【基础计划统计】【训练结构分析】【计划综合评价】【优化调整建议】
  数据：
  \`\`\`
  ${dataStr}
  \`\`\`
  `;

  const res = await client.chat.completions.create({
    model: 'deepseek-v4-pro',
    temperature: 0.1,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 1200
  });

  return res.choices[0].message.content;
}


async function main() {
  console.log('///')
  try {
    // 读取CSV
    const data = await readCsvFile('./data/training_plan.csv');
    console.log(data, '////');
    // 转为字符串传入AI
    const dataStr = JSON.stringify(data, null, 2);
    const report = await analyzeRunningData(dataStr);
    console.log('===== AI跑步数据分析报告 =====\n', report);
  } catch(error) {
    console.error('执行出错：', error.message);
  }
}

main();