/**
 * 图像理解 — qwen-vl-plus
 * DashScope OpenAI 兼容接口 + ChatOpenAI
 */
import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: 'qwen-vl-plus',
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
});

const response = await model.invoke([
  new HumanMessage({
    content: [
      { type: 'text', text: '详细描述这张图片的内容' },
      {
        type: 'image_url',
        image_url: {
          url: 'https://dashscope.oss-cn-beijing.aliyuncs.com/images/dog_and_girl.jpeg',
        },
      },
    ],
  }),
]);

console.log('model: qwen-vl-plus');
console.log(response.content);
