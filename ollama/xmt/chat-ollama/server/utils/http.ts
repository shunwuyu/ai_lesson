import { MultiPartData, type H3Event } from 'h3'
import type { KnowledgeBaseFormData } from '@/server/types'

export const parseKnowledgeBaseFormRequest = async (event: H3Event): Promise<KnowledgeBaseFormData> => {
  const items = await readMultipartFormData(event)
  const decoder = new TextDecoder("utf-8")
  const uploadedFiles: MultiPartData[] = []
  const formData: KnowledgeBaseFormData = {
    name: '',
    description: '',
    embedding: '',
    isPublic: true,
    uploadedFiles,
  }

  items?.forEach((item) => {
    const key = (item.name || '') as keyof KnowledgeBaseFormData
    const decodedData = decoder.decode(item.data)
    if (key.startsWith("file_")) {
      formData.uploadedFiles.push(item)
    }

    switch (key) {
      case 'isPublic':
        formData.isPublic = decodedData === 'true'
        break
      case 'name':
        formData.name = decodedData
        break
      case 'description':
        formData.description = decodedData
        break
      case 'embedding':
        formData.embedding = decodedData
        break
    }
  })
  return formData
}