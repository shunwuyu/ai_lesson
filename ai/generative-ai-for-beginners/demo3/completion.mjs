import client from "./client.mjs";

export async function getCompletion(prompt) {
  const response = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
}

export function genImage(prompt) {

}
