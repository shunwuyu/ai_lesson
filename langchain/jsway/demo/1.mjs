import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function chat(input) {
  const messages = [{ role: "user", content: input }];

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0,
  }, {
    proxy: {
        host: '127.0.0.1',
        port: 7890
    }
  });

  return response.data.choices[0].message.content;
}

const question = "What is the capital of France";

chat(question)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));