// node 
import { Readable } from 'stream';
// langchain util 包含document 文件处理
// 将多个文档对象格式化为一个字符串
import { formatDocumentsAsString } from "langchain/util/document"
import { PromptTemplate } from "@langchain/core/prompts"
// 可以执行的chain
import { RunnableSequence } from "@langchain/core/runnables"
import { BaseRetriever } from "@langchain/core/retrievers"
import prisma from "@/server/utils/prisma"
import { createChatModel, createEmbeddings } from '@/server/utils/models';
import { createRetriever } from '@/server/retriever'
import { AIMessage, BaseMessage, BaseMessageLike, HumanMessage } from '@langchain/core/messages';
// import { resolveCoreference } from '~/server/coref'

interface RequestBody {
  knowledgebaseId: number
  model: string
  family: string
  messages: {
    role: 'user' | 'assistant'
    content: string
  }[]
  stream: any
}

const SYSTEM_TEMPLATE = `Answer the user's question based on the context below.
Present your answer in a structured Markdown format.

If the context doesn't contain any relevant information to the question, don't make something up and just say "I don't know":
<context>
{context}
</context>

<chat_history>
{chatHistory}
</chat_history>

<question>
{question}
</question>

Answer:
`

export default defineEventHandler(async (event) => {
  const { knowledgebaseId, model, family, messages, stream} = await readBody<RequestBody>(event)
  if (knowledgebaseId) {
    console.log("Chat with knowledge base with id: ", knowledgebaseId)
    const knowledgebase = await prisma.knowledgeBase.findUnique({
      where: {
        id: knowledgebaseId
      }
    })
    console.log(`Knowledge base ${knowledgebase?.name} with embedding "${knowledgebase?.embedding}"`)
    if (!knowledgebase) {
      setResponseStatus(event, 400, `Knowledge base with id ${knowledgebaseId} not found`)
      return
    }
    const embeddings = createEmbeddings(knowledgebase.embedding!, event);
    const retriever: BaseRetriever = await createRetriever(embeddings, `collection_${knowledgebase.id}`)
    const chat = createChatModel(model, family, event)
    const query = messages[messages.length - 1].content
    // const reformulatedResult = await 
    const relevant_docs = await retriever.getRelevantDocuments(query)
    const chain = RunnableSequence.from([
      {
        question: (input: { question: string; chatHistory?: string}) => input.question
        chatHistory: (input: { question: string; chatHistory?: string }) =>
          input.chatHistory ?? "",
        context: async () => {
          return formatDocumentsAsString(rerankedDocuments)
        }
      },
      PromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
      chat
    ])

    if (!stream) {
      const response = await chain.invoke({
        question: query,
        chatHistory: serializeMessages(messages)
      })

      return {
        message: {
          role: 'assistant',
          content: response?.content,
          relevant_docs
        }
      }
    }

    setEventStreamResponse(event)
    const response = await chain.stream({
      question: query,
      chatHistory: serializeMessages(messages),
    })
  } else {
    const llm = createChatModel(model, family, event)
    if (!stream) {
      const response = await llm.invoke(transformMessages(messages))
      return {
        message: {
          role: 'assistant',
          content: response?.content
        }
      } 
    }

    const response = await llm?.stream(messages.map((message: RequestBody['messages'][number]]) => {
      for await (const chunk of response) {
        const message = {
          message: {
            role: 'assistant',
            content: chunk?.content
          }
        }
        yield `${JSON.stringify(message)} \n\n`
      }
    }))

    return sendStream(event, readableStream)
  }
  return {

  }
})