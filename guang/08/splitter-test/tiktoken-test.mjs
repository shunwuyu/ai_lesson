import { 
    getEncodingNameForModel, 
    getEncoding 
} from "js-tiktoken"; 

const modelName = "gpt-4"; 
// 获取模型对应的编码名字
const encodingName = getEncodingNameForModel(modelName);
// 字符->编码->token 数量
// cl100k_base 编码的名字
console.log(encodingName);
// 获取编码器
const enc = getEncoding(encodingName);
// 编码器编码字符串，返回 token 数量
console.log('apple', enc.encode('apple').length);
console.log('pineapple', enc.encode('pineapple').length);
console.log('苹果', enc.encode('苹果').length);
console.log('吃饭', enc.encode('吃饭').length);
console.log('一二三', enc.encode('一二三').length);