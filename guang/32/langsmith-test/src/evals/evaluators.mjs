/**
 * OpenEvals 内置 RAG 指标
 */
import {
  createLLMAsJudge, // 用大模型作为判断器，根据提示词判断输出是否符合预期
  RAG_GROUNDEDNESS_PROMPT, // 忠实度：答案是否被检索上下文支撑，有无幻觉
  RAG_HELPFULNESS_PROMPT, // 回答有用性：是否切题、是否答非所问
  RAG_RETRIEVAL_RELEVANCE_PROMPT, // 检索相关性：召回片段与问题是否相关
} from "openevals";
import { ChatOpenAI } from "@langchain/openai";

const judge = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  configuration: { baseURL: process.env.OPENAI_BASE_URL },
  model: process.env.MODEL_NAME ?? "qwen-plus",
  temperature: 0,
});

// RAG_GROUNDEDNESS_PROMPT —— 忠实度：答案是否被检索上下文支撑，有无幻觉
const ragGroundednessJudge = createLLMAsJudge({
  prompt: RAG_GROUNDEDNESS_PROMPT,
  // 评估指标的 key，用于在 dataset 中存储评估结果
  feedbackKey: "rag_groundedness",
  judge,
  // 是否连续评估，即是否在每次调用时都重新评估
  continuous: true,
});

// RAG_HELPFULNESS_PROMPT —— 回答有用性：是否切题、是否答非所问
const ragHelpfulnessJudge = createLLMAsJudge({
  prompt: RAG_HELPFULNESS_PROMPT,
  feedbackKey: "rag_helpfulness",
  judge,
  continuous: true,
});

// RAG_RETRIEVAL_RELEVANCE_PROMPT —— 检索相关性：召回片段与问题是否相关
const ragRetrievalRelevanceJudge = createLLMAsJudge({
  prompt: RAG_RETRIEVAL_RELEVANCE_PROMPT,
  feedbackKey: "rag_retrieval_relevance",
  judge,
  continuous: true,
});

export async function ragGroundednessEvaluator({ outputs }) {
  // 评估答案是否被检索上下文支撑，有无幻觉
  return ragGroundednessJudge({
    context: { documents: outputs.context },
    outputs: { answer: outputs.answer },
  });
}
// 评估回答是否符合题意，是否答非所问
export async function ragHelpfulnessEvaluator({ inputs, outputs }) {
  return ragHelpfulnessJudge({ inputs, outputs: { answer: outputs.answer } });
}
// 评估召回片段与问题是否相关
export async function ragRetrievalRelevanceEvaluator({ inputs, outputs }) {
  return ragRetrievalRelevanceJudge({
    inputs,
    context: { documents: outputs.context },
  });
}

export const ragEvaluators = [
  ragGroundednessEvaluator,
  ragHelpfulnessEvaluator,
  ragRetrievalRelevanceEvaluator,
];
