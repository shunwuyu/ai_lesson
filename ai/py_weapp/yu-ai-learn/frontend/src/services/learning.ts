import Taro from '@tarojs/taro'
import mockQuestions from '../data/questions'
import { Question } from '../types/learning'

export const API_BASE = process.env.TARO_APP_API_BASE || 'https://example.com/api'

export async function generateQuestions(topic: string): Promise<Question[]> {
  try {
    if (API_BASE !== 'https://example.com/api') {
      const response = await Taro.request<Question[]>({ url: `${API_BASE}/questions`, method: 'POST', data: { topic } })
      if (response.statusCode === 200 && response.data?.length) return response.data
    }
  } catch (_) { /* mock fallback */ }
  return mockQuestions(topic)
}
