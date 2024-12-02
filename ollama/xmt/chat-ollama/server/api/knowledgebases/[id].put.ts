import prisma from '@/server/utils/prisma';
import { isOllamaModelExists, isApiEmbeddingModelExists } from '@/server/utils/models'
import { getOllama } from '@/server/utils/ollama'
import { ingestDocument } from '~/server/utils/rag'
import { parseKnowledgeBaseFormRequest } from '@/server/utils/http'
import { requireKnowledgeBase, requireKnowledgeBaseOwner } from '~/server/utils/knowledgeBase'

export default defineEventHandler(async (event) => {
  const { knowledgeBaseId, uploadedFiles, name, description, isPublic } = await parseKnowledgeBaseFormRequest(event)
  const knowledgeBase = await requireKnowledgeBase(`${knowledgeBaseId}`)
  requireKnowledgeBaseOwner(event, knowledgeBase)

  if (uploadedFiles.length > 0) {
    if (!isApiEmbeddingModelExists(knowledgeBase.embedding!)) {
      const ollama = await getOllama(event, true)
      if (!ollama) return
      if (!(await isOllamaModelExists(ollama, knowledgeBase.embedding!))) {
        setResponseStatus(event, 404)
        return {
          status: "error",
          message: "Embedding model does not exist in Ollama"
        }
      }
    }
    try {
      await ingestDocument(uploadedFiles, `collection_${knowlegeBase.id}`, knowledgeBase.embedding!, event)
      for (const uploadedFile of uploadedFiles) {
        const createKnowledgeBaseFile = await prisma.knowledgeBaseFile.create({
          data: {
            url: uploadedFile.filename!,
            knowledgeBaseId: knowledgeBase.id
          }
        })
      }
    } catch(e) {

    }
  }
})