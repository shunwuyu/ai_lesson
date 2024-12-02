import { MultiPartData } from 'h3'

export type KnowledgeBaseFormData = {
  name: string
  embedding: string
  description: string
  isPublic: boolean
  uploadedFiles: MultiPartData[]
}

export type PageParser = 'default' | 'jinaReader'