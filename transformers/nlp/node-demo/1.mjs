// 1. 导入 transformers.js
import { pipeline } from "@xenova/transformers";

// 2. 创建翻译管道：英文 → 法文
async function translate() {
  let translator = await pipeline("translation_en_to_fr");

  // 3. 执行翻译（和你 Python 代码逻辑一模一样）
  let result = await translator(
    "Hugging Face is a technology company based in New York and Paris",
    { max_length: 40 }
  );

  // 4. 输出翻译结果
  console.log(result[0].translation_text);
}

translate();