import { getOllama } from '@/server/utils/ollama'

export interface ModelItem extends Partial<Omit<ModelResponse, 'details'>> {
  details: Partial<ModelDetails> & { family: string }
}

// Fetch Ollama models
async function fetchOllamaModels(event: any): Promise<ModelItem[]> {
  const ollama = await getOllama(event)
  if (ollama) {
    const response = await ollama.list()
    return response.models
  }
  return []
}

export default defineEventHandler(async (event) => {
  const keys = event.context.keys
  const models: ModelItem[] = []
  const apiCalls: Promise<ModelItem[]>[] = []

  apiCalls.push(fetchOllamaModels(event))
  const results = await Promise.allSettled(apiCalls)
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      models.push(...result.value)
    } else {
      console.error('Failed to fetch models:', result.reason)
    }
  })
  return models
})