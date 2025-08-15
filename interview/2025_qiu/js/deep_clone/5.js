// ❌ 错误方式（还是浅拷贝）
const newObj1 = Object.assign({}, oldObj);

// ✅ 正确方式（简单情况可用）
const newObj2 = JSON.parse(JSON.stringify(oldObj));

// ⚠️ 注意：JSON 方法有局限（不能处理函数、undefined、Symbol、循环引用等）