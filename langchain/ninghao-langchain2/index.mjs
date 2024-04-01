import * as dotenv from 'dotenv'
dotenv.config();

import { OpenAI } from '@langchain/openai';

const model = new OpenAI({ modelName: 'gpt-3.5-turbo'})

const response = await model.invoke('写一首描写春天的诗歌')

console.log(response)

