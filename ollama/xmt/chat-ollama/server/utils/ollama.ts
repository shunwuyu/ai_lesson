import { Ollama } from 'ollama'
import type { H3Event, EventHandlerRequest } from 'h3'

let ollama: Ollama | null = null

function createOllama(endpoint: string) {
  if (ollama) {
    return ollama
  }

  return new Ollama({
    host: endpoint
  })
}

async function pingOllama(endpoint: string) {
  const res = await $fetch.raw(endpoint, { ignoreResponseError: true }).catch(() => null)
  if (res?.status !== 200) {
    const errMsg = [
      `ChatOllama is unable to establish a connection with ${endpoint}, please check:`,
      '  1. Is Ollama server running ? (run `ollama serve` in terminal to start the server)',
      `  2. Can the server where ChatOllama is located connect to \`${endpoint}\` ?`
    ].join('\n')

    console.error(errMsg)
    return errMsg
  }
  return null
}

export async function getOllama(event: H3Event<EventHandlerRequest>, interceptResponse = false) {
  // console.log(event.context, '///////////////////??????')
  const { endpoint } = event.context.keys.ollama
  const result = await pingOllama(endpoint)

  if (result !== null) {
    if (interceptResponse)
      event.respondWith(new Response(result, { status: 500 }))
    return null
  }

  return createOllama(endpoint)
}

