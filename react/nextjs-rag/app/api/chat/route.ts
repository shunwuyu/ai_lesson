import { createOpenAI } from "@ai-sdk/openai";
import { embed, streamText } from "ai";
import { createClient } from "@supabase/supabase-js";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
// 异步函数：生成文本的向量嵌入（embedding）
async function generateEmbedding(message: string) {
  // 返回的是一个包含向量（embedding 数组）的结果对象。
  return embed({
    // 使用 OpenAI 的 text-embedding-3-small 模型
    model: openai.embedding("text-embedding-3-small"),
    // 要编码的文本内容
    value: message,
  });
}

async function fetchRelevantContext(embedding: number[]) {
  const { data, error } = await supabase.rpc("get_relevant_chunks", {
    // 传入要搜索的向量（即用户问题的嵌入向量），用于在数据库中查找语义最相似的内容。
    query_vector: embedding,
    // 相似度阈值，只有数据库中向量与查询向量的余弦相似度 
    // 大于 0.5 的结果才会被返回，避免匹配不相关的内容。
    match_threshold: 0.5,
  // 最多返回 3 条最相似的匹配结果
    match_count: 3,
  });

  if (error) throw error;

  return JSON.stringify(
    data.map(
      (item: any) => `
        Source: ${item.url}
        Date Updated: ${item.date_updated}
        Content: ${item.content}
        `
    )
  );
}

function createPrompt(context: string, userQuestion: string) {
  return {
    role: "system",
//     请以 Markdown 格式返回答案，包含相关链接以及信息最后更新的日期。  
// 如果上述上下文提供的信息不足以回答问题，请基于您自己的知识作答，但需加以说明，
// 让用户知道该信息可能不是最新的。  
// 如果用户提出的问题与智能手机无关，请礼貌地告知他们您只能回答关于智能手机的问题。
    content: `
      You are a helpful assistant that provides information about the latest smartphones. 
      Use the following context to answer questions: 
      ----------------
      START CONTEXT
      ${context}
      END CONTEXT
      ----------------
      
      Return the answer in markdown format including relevant links and the date when the information was last updated.
      Where the above context does not provide enough information relating to the question provide an answer based on your own knowledge but caveat it so the user
      knows that it may not be up to date.
      If the user asks a question that is not related to a smartphone, politely inform them that you can only answer questions about smartphones.
      
      ----------------
      QUESTION: ${userQuestion}
      ----------------`,
  };
}

export async function POST(req: Request) {
  console.log('--------------------------')
  try {
    const { messages } = await req.json();
    const latestMessage = messages.at(-1).content;
    // console.log(latestMessage);
    const { embedding } = await generateEmbedding(latestMessage);
    // console.log(embedding,'///')
    const context = await fetchRelevantContext(embedding);
    // console.log(context);
    const prompt = createPrompt(context, latestMessage);
    console.log(prompt, '////');
    // 这段代码使用 `streamText` 函数启动一个流式 AI 响应生成过程
    // 返回一个可异步读取的文本流，
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [prompt, ...messages],
    });
    console.log(result, '///////');
    // result.toDataStreamResponse() 将流式生成的 AI 文本结果转换为一个标准的 Response 对象，用于在 API 路由中以流式数据
    // （如 text/plain 或自定义格式）返回给前端，支持实时逐字输出。
    return result.toDataStreamResponse();
  } catch(error) {
    console.log("Error generating response: " + error);
    throw error
  }
}