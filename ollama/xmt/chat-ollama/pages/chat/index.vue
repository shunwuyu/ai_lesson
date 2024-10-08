<script setup lang="ts">
import type { ComponentInstance } from 'vue'
const sessionId = ref(0)
const { t } = useI18n()
// import ChatSessionList from '~/components/ChatSessionList.vue'
// const chatSessionListRef = shallowRef<ComponentInstance<typeof ChatSessionList>>()

async function onChangeChatSession(id: number) {
  sessionId.value = id
}

function onNewChat() {
  // chatSessionListRef.value?.createChat()
}
</script>
<template>
  <div class="h-full max-w-6xl mx-auto flex flex-1 border border-gray-200 dark:border-gray-800 rounded-md shadow-md"
       style="--chat-side-width:240px">
    <ClientOnly>
      <!-- <ChatSessionList ref="chatSessionListRef"
                       class="shrink-0 w-[var(--chat-side-width)] hidden md:block"
                       @select="onChangeChatSession" /> -->
    </ClientOnly>
    <div  class="grow h-full flex justify-center items-center">
      <UButton icon="i-material-symbols-add" color="primary" square @click="onNewChat">{{ t("chat.newChat") }}</UButton>
    </div>
  </div>
</template>