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
  你是专业跑步数据分析师，严格基于下方\`\`\`内的单人实际跑步CSV数据，禁止编造任何数据：
  1. 基础统计：计算全周期总跑步里程、总纯运动时长、平均配速（分钟/公里）、总卡路里消耗、各训练周完成里程分布
  2. 表现分析：对比Easy run、Long run、Tempo run、Speedwork等不同跑步类型的配速、距离、时长表现差异
  3. 周期评价：结合1-23周完整训练周期，评价整体训练执行进度、负荷递进合理性、备赛目标达成情况
  4. 优化建议：给出3条完全基于当前数据的针对性跑步训练优化建议
  输出格式严格遵循：【基础数据统计】【训练表现分析】【周期训练评价】【针对性优化建议】
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
    const data = await readCsvFile('./data/daily_running_data.csv');
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