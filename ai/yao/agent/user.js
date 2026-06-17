// user.js - 故意包含多种错误的测试文件

const axios = require('axios');

// 1. 变量命名不规范（使用 var，且命名不清晰）
var usr_data = null; 

// 2. 魔法数字与硬编码
function getUser(id, type) {
  if (type == 1) { // 魔法数字，缺少明确含义
    return fetchUserFromDB(id);
  } else if (type == 2) {
    return fetchUserFromCache(id);
  }
}

// 3. 代码风格与对齐混乱
async function fetchUserFromDB(userId) {
  try {
      // 缩进不一致（4空格与2空格混用）
      const response = await axios.get(`/api/users/${userId}`);
    if(response.data){ // 缺少空格
      usr_data = response.data; // 修改了外部变量（副作用）
      return response.data
    }
  } catch (err) {
    console.log(err); // 错误处理不规范，仅打印不抛出
  }
}

// 4. 未处理的 Promise 与内存泄漏风险
function fetchUserFromCache(userId) {
  // 缺少 async/await，且没有处理缓存未命中的情况
  const cacheResult = localStorage.getItem(`user_${userId}`);
  return JSON.parse(cacheResult); // 如果 cacheResult 为 null，会抛出语法错误
}

// 5. 函数过长，违反单一职责原则
function processAndSaveUser(rawData) {
  // 复杂的嵌套逻辑
  if (rawData) {
    if (rawData.age > 18) {
      if (rawData.email) {
        // 字符串拼接不规范
        const fullName = rawData.firstName + " " + rawData.lastName;
        // 缺少分号
        console.log("Processing user: " + fullName) 
        // 未定义变量
        saveToDatabase(fullName, rawData.email, someUndefinedVar); 
      }
    }
  }
}