// 原始文本                                                                                     
// const str = 'Hi';   
const str = '你好';                                                                              
                                  
// 字符串 -> Uint8Array（编码）
// 把字符串转成 Uint8Array 字节  TextEncoder     
// Unsigned Integer 8-bit，即无符号 8 位整数，取值范围 0~255，一个字节。Array                        
  // 里的每个元素就是这样一个字节。   2的8次方256 
  // 底层是二进制存储，展示是十进制显示  
  //  为什么0-255 就能是所有数字的编码?
// 0~255 一个字节只能表示 256 种组合，这只够覆盖：                                                   
//   - 英文字母大小写（52 个）
//   - 数字（10 个）                                                                                   
//   - 标点符号（~30 个）                   
//   - 控制字符（~30 个）                                                                              
                                                                                                    
//   这就是 ASCII 的范围。

//   中文呢？ 几千个汉字，256 种值根本不够。所以中文必须用多个字节拼起来表示一个汉字：

//   "你" 的 UTF-8 编码：Uint8Array [228, 189, 160]  ← 3 个字节
//   "Hi" 的 UTF-8 编码：Uint8Array [72, 105]          ← 2 个字节                                                       
const encoded = new TextEncoder().encode(str);   
console.log(encoded);                                                
// Uint8Array(2) [72, 105]                                                                        
                                                                                                  
// Uint8Array -> 字符串（解码）        
const decoded = new TextDecoder().decode(encoded);
// 'Hi'
console.log(decoded);