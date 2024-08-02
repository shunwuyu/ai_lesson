import * as dotenv from 'dotenv'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
dotenv.config();

const model = new ChatOpenAI({
    configuration: {
        baseURL: "https://api.302.ai/v1",
        apiKey: 'sk-X0elCqFwBaSuKkLwmcvMKGMlacmRAwmb2hjaKm4MxBu2cdIY'
      },
      model: "gpt-3.5-turbo",
      streaming: true,
      callbacks:[{
        handleLLMNewToken(token) {
          process.stdout.write(token)
        }
      }]
  });

  const messages = [
    new SystemMessage("你是一位助理"),
    new HumanMessage("写一首描写春天的诗歌"),
  ];

  const result = await model.invoke(messages);
  console.log(result.content);