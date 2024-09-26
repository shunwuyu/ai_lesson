<script setup lang="ts">
import { SSE } from 'sse.js'

const examples = [
  'A login screen with email, google, and apple login.',
  'A Tweet UI with retweet and like buttons.',
  'A cookie consent banner',
  'A toolbar for a wysiwyg editor',
  'A FAQ section',
]

const messageListRef = ref()
const query = ref((useRoute().query.q as string | undefined) ?? '')
const loading = ref(false)
const searching = ref(false)
const view = ref<'chat' | 'question'>('question')

onMounted(() => {
  if (query.value)
    search()
})

const messageState = ref({
  messages: [] as any[],
  pending: undefined as string | undefined,
  history: [] as any[],
})



async function search() {
  if (!query.value.trim())
    return

  view.value = 'chat'
  const question = query.value.trim()

  searching.value = true

  messageState.value.messages.push({
    type: 'user',
    message: question,
    dateTime: new Date().toISOString(),
  })

  loading.value = true
  query.value = ''
  messageState.value.pending = ''
  const ctrl = new AbortController()
  try {
    const eventSource = new SSE('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({
        question,
        history: messageState.value.history,
      }),
    })

    eventSource.addEventListener('message', (event) => {
      if (event.data === '[DONE]') {
        messageState.value.history = [messageState.value.pending ?? '']
        messageState.value.messages.push({
          type: 'bot',
          message: messageState.value.pending ?? '',
          dateTime: new Date().toISOString(),
        })
        messageState.value.pending = undefined
        loading.value = false
        ctrl.abort()
      }
      else {
        const data = JSON.parse(event.data)
        console.log(data);
        if (data.data !== '' && searching.value)
          searching.value = false
          messageState.value.pending += data.content
      }
    })

    eventSource.stream()
  } catch(err) {
    console.log(err)
  }

}

const chatMessages = computed(() => {
  if (messageListRef.value)
    messageListRef.value.scrollTop = messageListRef.value.scrollHeight

  const messages = [
    ...messageState.value.messages,
    ...(messageState.value.pending
      ? [
          {
            type: 'bot',
            message: messageState.value.pending,
          },
        ]
      : []),
  ]

  if (searching.value) {
    messages.push({
      type: 'bot',
      message: '',
    })
  }

  return messages
})
</script>
<template>
<main class="flex flex-col h-full ">
    <div class="h-1/2 px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-y-4 overflow-scroll">
      <template v-if="view === 'question'">
        <p class="text-sm font-medium leading-6 text-gray-400">
          Examples
        </p>
        <ul role="list" class="flex flex-col gap-y-1">
          <li
            v-for="(example, index) in examples" :key="index"
            class="flex px-2 py-3 hover:bg-foreground/10 text-foreground items-center gap-x-4 text-sm leading-5  font-medium rounded-md aria-selected:bg-background/80 cursor-pointer"

            @click="setQuestion(example)"
          >
            <Icon name="ion:sparkles" class="text-primary" size="20" />
            {{ example }}
          </li>
        </ul>
      </template>
      <div v-else ref="messageListRef" class="rounded-md pl-2 py-4 pr-4">
        <ChatConversation :messages="chatMessages" />
      </div>
      <div class="flex flex-col gap-y-3">
        <div class="flex items-start space-x-4">
          <div class="min-w-0 flex-1">
            <div class="">
              <UTextarea
                id="comment"
                v-model="query"
                class="p-1"
                :disabled="loading"
                :rows="3"
                name="comment"
                placeholder="Ask Nuxt Labs AI a question..."
                autoresize
              />

              <UButton
                trailing
                icon="i-solar-transfer-horizontal-linear"
                label="Send"
                color="gray" variant="solid"
                @click="search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
</main>
</template>