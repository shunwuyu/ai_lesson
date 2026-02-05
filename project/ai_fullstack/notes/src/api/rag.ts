import axios from "./config";

export const ask = async (question: string) => {
  const res = await axios.post('/ai/rag', { question });
  // console.log(res, '//////')
  return res
}

