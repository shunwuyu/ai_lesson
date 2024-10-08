import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama"
import { OPENAI_EMBEDDING_MODELS, GEMINI_EMBEDDING_MODELS, MODEL_FAMILIES } from '~/config/index'
import { type H3Event } from 'h3'
import { Embeddings } from "@langchain/core/embeddings"
import { type Ollama } from 'ollama'
import { BaseChatModel } from "@langchain/core/language_models/chat_models"
import { ContextKeys } from "../middleware/keys"
import { ChatOllama } from "@langchain/community/chat_models/ollama"

export function isApiEmbeddingModelExists(embeddingModelName: string) {
  return [...OPENAI_EMBEDDING_MODELS, ...GEMINI_EMBEDDING_MODELS].includes(embeddingModelName)
}

export async function isOllamaModelExists(ollama: Ollama, embeddingModelName: string) {
  const res = await ollama.list()
  return res.models.some(model => model.name.includes(embeddingModelName))
}


export const createEmbeddings = (embeddingModelName: string, event: H3Event): Embeddings => {
  const keys = event.context.keys
  
  console.log(`Creating embeddings for Ollama served model: ${embeddingModelName}`)
  return new OllamaEmbeddings({
    model: embeddingModelName,
    baseUrl: 'http://localhost:11434',
  })
  
}

export const createChatModel = (modelName: string, family: string, event: H3Event):BaseChatModel {
  const keys = event.context.keys
  const [familyValue] = Object.entries(MODEL_FAMILIES).find(([key, val]) => val === family )|| []
  if (familyValue) {
    const data = keys[familyValue as Exclude<keyof ContextKeys, 'ollama' | 'custom'>]
    return initChat(family, modelName, data)!
  }
  return new ChatOllama({
    baseUrl: keys.ollama.endpoint,
    model: modelName,
    numPredict: 3000
  })
}