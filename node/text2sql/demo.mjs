import OpenAI  from "openai";
import sqlite3 from 'sqlite3';

const client = new OpenAI({
  apiKey: 'sk-Gl1ASRfqtsM8Y89sWlInTrElCDUja0M2X7B4lIQrY1oThSkV',
  baseURL: 'https://api.302.ai/v1' // 转发 
})


// 打开数据库
const db = new sqlite3.Database('./mydatabase.db');

// 自然语言转 SQL 查询函数
const textToSQL = async (text) => {
    try {
        // console.log(text, '//////')
        const prompt =  `
        你是一个SQL专家.
        employees Schema 设计如下， 用三个单引号括起来
        '''CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY, 
            name TEXT NOT NULL, 
            department TEXT NOT NULL, 
            salary INTEGER NOT NULL
        );'''
        为以下用三个单引号括起来文本生成sql并返回 '''${text}'''
        请直接返回以下描述所需的SQL查询文本，不要包含任何额外的说明或代码块格式。
        `;
        // console.log(prompt);
        const response =  await client.chat.completions.create({
            model: 'gpt-4o',  // 可以使用其他合适的模型
            messages: [
                {
                    role: 'user', // 角色
                    content: prompt
                }
            ],
        });
        // console.log(response.choices[0].message.content)
        const sqlQuery = response.choices[0].message.content;
        
        // console.log(`Generated SQL: ${sqlQuery}`);
        return sqlQuery;
    } catch (error) {
        console.error('Error generating SQL query:', error);
    }
};

// 示例：根据自然语言生成 SQL 查询
const userInput = '请返回department值为销售的所有员工的姓名和薪资';
// console.log(userInput)
textToSQL(userInput).then((sqlQuery) => {
    // 执行生成的 SQL 查询
    // console.log(sqlQuery)
    db.all(sqlQuery, [], (err, rows) => {
        if (err) {
            console.error('Error executing SQL query:', err.message);
        } else {
            console.log('Query result:', rows);
        }
    });
});

// 关闭数据库
// db.close((err) => {
//     if (err) {
//         console.error("数据库关闭失败", err.message);
//     } else {
//         console.log("数据库关闭成功");
//     }
// });
