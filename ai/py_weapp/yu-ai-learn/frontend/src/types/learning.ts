export interface Question {
  id: string
  type: string
  difficulty: string
  title: string
  options: string[]
  answer: number
  explanation: string
}

export interface Report {
  topic: string
  correct: number
  total: number
  coins: number
  xp: number
  summary: string[]
  mastered: string[]
  improve: string[]
}
