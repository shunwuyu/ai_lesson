import { getEncoding } from "js-tiktoken";

// 1. 初始化编码器 (以 GPT-4 / GPT-3.5-turbo 使用的 cl100k_base 为例)
const enc = getEncoding("cl100k_base"); 

// const text = "Hello, tiktoken! 你好，世界！";
const text = "好";

// 2. 编码 (文本 -> Token ID 列表)
const tokens = enc.encode(text);
console.log("Token IDs:", tokens); 

// 3. 解码 (Token ID 列表 -> 原始文本)
const decodedText = enc.decode(tokens);
console.log("解码结果:", decodedText); 

// 4. 计算 Token 长度
const tokenCount = tokens.length;
console.log("Token 数量:", tokenCount); 