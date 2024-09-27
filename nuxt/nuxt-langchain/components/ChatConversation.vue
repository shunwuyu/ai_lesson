<script setup lang="ts">
import Markdown from 'vue3-markdown-it'

defineProps({
  messages: {
    type: Array as PropType<any[]>,
    required: true,
  }
})

function changeCode(message: string) {
  return `${message}`
}
</script>

<template>
  <ul  class="space-y-6 relative">
    <li v-for="(message, index) in messages" :key="index" class="relative flex gap-x-4">
      <Icon
        name="ion:sparkles"
        class="relative p-1 flex-none h-7 w-7 rounded-full text-primary" :class="{
          'mt-3': index !== 0,
        }"
      />
      <div class="flex-auto relative rounded-md p-3 border-dashed border border-gray-700 w-full ">
        <p v-if="message.type === 'user'" class="text-sm leading-6 ">
          {{ message.message }}
        </p>
        <template v-else>
          <ClientOnly>
            <Markdown
              v-if="message.message && message.message.length" class="markdown text-sm leading-6"
              :source="changeCode(message.message)"
            />
            <div
              v-else-if="message.message === ''"
              class="bg-slate-300 h-[21px] w-[13px] mt-1 animate-pulse"
            />
          </ClientOnly>
        </template>
      </div>
    </li>
  </ul>
</template>

<style scoped></style>