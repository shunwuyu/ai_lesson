<template>
  <section class="relative overflow-hidden bg-gradient-to-b from-primary-light/50 to-white transition-all"
    :class="compact ? 'pt-6 pb-4 sm:pt-8 sm:pb-6' : 'pt-16 pb-12 sm:pt-24 sm:pb-16'"
  >
    <!-- 装饰背景 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
    </div>

    <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <template v-if="showSlogan">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-border-light text-sm text-text-secondary"
          :class="compact ? 'mb-3' : 'mb-6'"
        >
          <span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>
          支持 1800+ 平台，永久免费使用
        </div>

        <h1 :class="compact ? 'text-2xl sm:text-3xl mb-2' : 'text-3xl sm:text-5xl mb-4'" class="font-bold text-text-primary leading-tight">
          免费在线视频下载器
          <span class="text-primary">，一键保存</span>
        </h1>
        <p :class="compact ? 'mb-4 text-sm sm:text-base' : 'mb-10 text-base sm:text-lg'" class="text-text-secondary max-w-2xl mx-auto leading-relaxed">
          粘贴视频链接，智能解析下载。支持 YouTube、Bilibili、抖音、TikTok 等 1800+ 平台，多种清晰度可选，还能 AI 总结视频内容
        </p>
      </template>

      <!-- 搜索输入框 -->
      <div class="max-w-2xl mx-auto">
        <form @submit.prevent="onSubmit" class="relative flex items-center" role="search" aria-label="视频链接解析">
          <div class="relative flex-1">
            <label for="video-url-input" class="sr-only">粘贴视频链接进行解析下载</label>
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <input
              id="video-url-input"
              v-model="url"
              type="url"
              :placeholder="placeholder"
              class="w-full h-13 sm:h-14 pl-12 pr-4 rounded-full sm:rounded-r-none border border-border bg-white text-base text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
              :disabled="loading"
              autocomplete="url"
            />
          </div>
          <button
            type="submit"
            :disabled="loading || !url.trim()"
            class="hidden sm:flex items-center gap-2 h-14 px-8 rounded-r-full bg-primary hover:bg-primary-dark text-white font-medium text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {{ loading ? '解析中...' : '解析视频' }}
          </button>
          <!-- 移动端按钮 -->
          <button
            type="submit"
            :disabled="loading || !url.trim()"
            class="sm:hidden absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <div v-if="showSlogan" class="flex flex-wrap items-center justify-center gap-3 mt-5 text-xs text-text-muted">
          <span>试试：</span>
          <button
            v-for="example in examples"
            :key="example.label"
            @click="url = example.url"
            class="px-3 py-1 rounded-full bg-white border border-border-light hover:border-primary hover:text-primary transition-all cursor-pointer"
          >
            {{ example.label }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: Boolean,
  compact: Boolean,
  showSlogan: { type: Boolean, default: true },
})
const emit = defineEmits(['parse'])

const url = ref('')
const placeholder = 'https://www.youtube.com/watch?v=... 粘贴视频链接'

const examples = [
  { label: 'YouTube', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { label: 'Bilibili', url: 'https://www.bilibili.com/video/BV1GJ411x7h7' },
  { label: 'Twitter/X', url: 'https://x.com/elonmusk/status/1234567890' },
]

function normalizeUrl(raw) {
  let u = raw
  if (u.includes('bilibili.com') && !u.includes('www.bilibili.com')) {
    u = u.replace('bilibili.com', 'www.bilibili.com')
  }
  return u
}

function onSubmit() {
  const trimmed = url.value.trim()
  if (trimmed) {
    emit('parse', normalizeUrl(trimmed))
  }
}
</script>
