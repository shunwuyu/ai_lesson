import { MultiPartData, H3Event } from 'h3'
import { Document } from "@langchain/core/documents"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { TextLoader } from "langchain/document_loaders/fs/text"
import { JSONLoader } from "langchain/document_loaders/fs/json"
import { DocxLoader } from "langchain/document_loaders/fs/docx"
import { CSVLoader } from "langchain/document_loaders/fs/csv"
import { createRetriever } from '@/server/retriever'
import { PageParser } from '../types'

interface LoadUrlOptions {
  pageParser: PageParser
  maxDepth?: number
  excludeGlobs?: string[]
}

export const loadDocuments = async (file: MultiPartData) => {
  const Loaders = {
    pdf: PDFLoader,
    json: JSONLoader,
    csv: CSVLoader,
    docx: DocxLoader,
    doc: DocxLoader,
    txt: TextLoader,
    md: TextLoader,
  } as const

  const ext = (file.filename?.match(/\.(\w+)$/)?.[1] || 'txt').toLowerCase() as keyof typeof Loaders
  if (!Loaders[ext]) {
    throw new Error(`Unsupported file type: ${ext}`)
  }
  const blob = new Blob([file.data], { type: file.type })
  return new Loaders[ext](blob).load()
}

export const ingestDocument = async (
  files: MultiPartData[],
  collectionName: string,
  embedding: string,
  event: H3Event
) => {
  console.log(files)
  const docs = []
  for (const file of files) {
    const loadedDocs = await loadDocuments(file)
    loadedDocs.forEach((doc) => doc.metadata.source = file.filename)
    docs.push(...loadedDocs)
  }
  // console.log(docs, '---？？？/////////////');
  // 实例化embedding 模块
  const embeddings = createEmbeddings(embedding, event)
  console.log(embeddings, '-------------')
  await createRetriever(embeddings, collectionName, docs)

  console.log(`${docs.length} documents added to collection ${collectionName}----.`)
}

export const loadURL = async (url: string, options: LoadUrlOptions) => {
  let loaderOptions: RecursiveUrlLoaderOptions = {
    maxDepth: options.maxDepth ?? 0,
    callerOptions: {
      maxRetries: 1
    },
    timeout: 5000,
    excludeGlobs: options.excludeGlobs ?? []
  }

  if (options.pageParser === 'jinaReader') {
    loaderOptions.fetch = (url, options) => {
      return fetch(`https://r.jina.ai/${url}`, options)
    }
    loaderOptions.extractMetadata = (text, url) => {
      return {
        source: url,
        title: text.trim().match(/(?<=^Title: ).+/?.[0]??'')
      }
    }
  } else {
    loaderOptions.extractor = compile({wordwrap: 130})
  }
  const loader = RecusiveUrlLoader(url, loaderOptions)
  const docs = await loader.load()
  
  return docs
}

export const ingestURLs = async (
  urls: string[],
  collectionName: string,
  embedding: string,
  event: H3Event
) => {
  const docs: Document[] = []
  const entryAndChildUrls = new Set<string>()
  const { pageParser, maxDepth, excludeGlobs } = await parseKnowledgeBaseFormRequest(event)

  for (const url of urls) {
    const loadedDocs = await loadURL(url, { pageParser, maxDepth, excludeGlobs })
    loadedDocs.forEach(doc => {
      docs.push(doc)
    })
  }
}