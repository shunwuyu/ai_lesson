import dotenv from 'dotenv';
dotenv.config();

// 直接用 fetch 发送请求（Node.js 18+ 自带，不用安装任何包）
async function generateImage() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const res = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      "model": "qwen-image-2.0-pro",
      "input": {
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/thtclx/input1.png"
              },
              {
                "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/iclsnx/input2.png"
              },
              {
                "image": "https://help-static-aliyun-doc.aliyuncs.com/file-manage-files/zh-CN/20250925/gborgw/input3.png"
              },
              {
                "text": "图1中的女生穿着图2中的黑色裙子按图3的姿势坐下"
              }
            ]
          }
        ]
      },
      "parameters": {
        "n": 1,
        "negative_prompt": " ",
        "prompt_extend": true,
        "watermark": false,
        "size": "1024*1536"
      }
    })
  });

  const result = await res.json();
  console.log('✅ 生成结果：', JSON.stringify(result, null, 2));

  // 直接输出图片 URL
  if (result.output?.choices) {
    result.output.choices.forEach((item, index) => {
      console.log(`\n🖼️ 图片 ${index + 1}：`, item.image_url);
    });
  }
}

generateImage();