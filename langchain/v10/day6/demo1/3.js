import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
  apiKey: 'sk-Oqi5bDKlItgXYQMIzXVaaAoEL5Bc9Q35Py4QfKKEmQP1w26x',
  baseUrl: 'https://api.302.ai/embeddings'
});

const vector1 = await embeddings.embedQuery("猫会抓老鼠");
console.log(vector1.splice(0, 10));
