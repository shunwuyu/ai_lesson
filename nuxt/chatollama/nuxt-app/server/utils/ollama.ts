export async function getOllama(event: H3Event<EventHandlerRequest>, interceptResponse = false) {
  const { endpoint, username, password } = event.context.keys.ollama
  const result = await pingOllama(endpoint)
  if (result !== null) {
    if (interceptResponse)
      event.respondWith(new Response(result, { status: 500 }))
    return null
  }

  return createOllama(endpoint, username, password)
}