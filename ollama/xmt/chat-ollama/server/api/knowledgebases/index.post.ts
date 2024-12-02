import prisma from '@/server/utils/prisma'
import { parseKnowledgeBaseFormRequest } from '@/server/utils/http'
import { isApiEmbeddingModelExists } from '@/server/utils/models'
import { getOllama } from '@/server/utils/ollama'
import { ingestDocument } from '~/server/utils/rag'

export default defineEventHandler(async (event) => {
  const { name, description, embedding, isPublic, uploadedFiles } =
    await parseKnowledgeBaseFormRequest(event)

  if (uploadedFiles.length === 0) {
    setResponseStatus(event, 400)
    return {
      status: "error",
      message: "Must upload at least one file or one URL"
    }
  }

  // console.log('////', name, description, embedding, isPublic, uploadedFiles, '-----')
  // 如果不是ollama的， 可以是OpenAIEmbedding ...
  // console.log(isApiEmbeddingModelExists(embedding), '======')
  if (!isApiEmbeddingModelExists(embedding)) {
    const ollama = await getOllama(event, true)
    console.log(ollama, '||||///////////////')
    if (!ollama) return
    if (!(await isOllamaModelExists(ollama, embedding))) {
      setResponseStatus(event, 404)
      return {
        status: "error",
        message: "Embedding model does not exist in Ollama"
      }
    }
  }

  const exist = await prisma.knowledgeBase.count({ where: { name: name } }) > 0
  if (exist) {
    // 409 Conflict
    setResponseStatus(event, 409)
    return {
      status: "error",
      message: "Knowledge Base's Name already exist"
    }
  }

  const currentUser = event.context.user
  console.log(currentUser,'???')

  const affected = await prisma.knowledgeBase.create({
    data: {
      name: name,
      description: description,
      embedding: embedding,
      is_public: isPublic,
      user_id: currentUser?.id,
      created: new Date(),
    }
  })

  console.log(`Created knowledge base ${name}: ${affected.id} by ${currentUser ? currentUser.name : 'anonymous'}`)

  try {
    await ingestDocument(uploadedFiles, `collection_${affected.id}`, affected.embedding!, event)
  } catch(err) {
    // 回滚
    await prisma.knowledgeBase.delete({
      where: {
        id: affected.id
      }
    })
    console.log(err)
  }

  return {
    
  }
})