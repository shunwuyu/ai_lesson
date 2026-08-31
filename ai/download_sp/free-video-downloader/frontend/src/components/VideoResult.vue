<template>
  <div class="bg-white rounded-2xl border border-border shadow-lg overflow-hidden h-full">
    <!-- 视频信息头部 -->
    <div class="flex flex-col gap-5 p-5 sm:p-6">
      <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
        <img
          v-if="video.thumbnail"
          :src="thumbnailUrl"
          :alt="video.title"
          class="w-full h-full object-cover"
          @error="(e) => e.target.style.display = 'none'"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-text-muted">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <div v-if="video.duration_string" class="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded-md">
          {{ video.duration_string }}
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold text-text-primary leading-snug mb-2 line-clamp-2">
          {{ video.title }}
        </h3>
        <div class="flex flex-wrap items-center gap-3 text-sm text-text-secondary mb-3">
          <span class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ video.uploader }}
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-light text-primary rounded-full text-xs font-medium">
            {{ video.platform }}
          </span>
          <span v-if="video.view_count" class="inline-flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ formatViewCount(video.view_count) }}
          </span>
        </div>
        <p v-if="video.description" class="text-sm text-text-muted line-clamp-2">
          {{ video.description }}
        </p>
      </div>
    </div>

    <!-- 格式选择 -->
    <div class="border-t border-border-light px-5 sm:px-6 py-5">
      <h4 class="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
        <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        选择清晰度和格式
      </h4>

      <div class="grid grid-cols-1 gap-2.5">
        <button
          v-for="fmt in video.formats"
          :key="fmt.format_id"
          @click="selectedFormat = fmt.format_id"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all cursor-pointer',
            selectedFormat === fmt.format_id
              ? 'border-primary bg-primary-light ring-1 ring-primary/20'
              : 'border-border-light hover:border-primary/40 hover:bg-gray-50'
          ]"
        >
          <div class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
            :class="selectedFormat === fmt.format_id ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <div class="min-w-0">
            <div class="text-sm font-medium text-text-primary truncate">{{ fmt.label }}</div>
            <div class="text-xs text-text-muted">{{ fmt.ext.toUpperCase() }} {{ fmt.has_audio ? '· 含音频' : '· 仅视频' }}</div>
          </div>
        </button>
      </div>

      <!-- 下载按钮 -->
      <div class="mt-6 flex flex-col items-stretch gap-3">
        <button
          @click="$emit('download', selectedFormat)"
          :disabled="!selectedFormat || downloading"
          class="w-full inline-flex items-center justify-center gap-2 h-12 px-10 rounded-full bg-primary hover:bg-primary-dark text-white font-medium text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg cursor-pointer"
        >
          <svg v-if="downloading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {{ downloading ? '下载中，请稍候...' : '立即下载' }}
        </button>
        <!-- AI 总结按钮（重新总结） -->
        <button
          @click="$emit('summarize')"
          :disabled="summarizing"
          class="w-full inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium text-base transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
        >
          <svg v-if="summarizing" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          {{ summarizing ? '总结中...' : 'AI 总结' }}
        </button>
        <span v-if="selectedFormat" class="text-xs text-text-muted text-center">
          已选择: {{ getSelectedLabel() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  video: { type: Object, required: true },
  downloading: Boolean,
  summarizing: Boolean,
})
defineEmits(['download', 'summarize'])

const thumbnailUrl = computed(() => {
  if (!props.video.thumbnail) return ''
  return '/api/proxy/thumbnail?url=' + encodeURIComponent(props.video.thumbnail)
})

const selectedFormat = ref(
  props.video.formats?.length > 0 ? props.video.formats[0].format_id : ''
)

function getSelectedLabel() {
  const fmt = props.video.formats?.find(f => f.format_id === selectedFormat.value)
  return fmt?.label || ''
}

function formatViewCount(count) {
  if (!count) return ''
  if (count >= 100000000) return (count / 100000000).toFixed(1) + '亿'
  if (count >= 10000) return (count / 10000).toFixed(1) + '万'
  return count.toLocaleString()
}
</script>
