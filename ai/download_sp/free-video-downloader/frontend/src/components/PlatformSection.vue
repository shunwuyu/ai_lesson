<template>
  <section id="platforms" class="py-16 sm:py-20 bg-bg-section" aria-labelledby="platforms-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <h2 id="platforms-heading" class="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          支持全球 <span class="text-primary">1800+</span> 视频平台下载
        </h2>
        <p class="text-text-secondary text-base max-w-xl mx-auto">
          几乎覆盖所有主流视频、音频、社交媒体平台，包括 YouTube、Bilibili、抖音等
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
        <div
          v-for="platform in platforms"
          :key="platform.name"
          class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-white rounded-full border border-border-light shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
        >
          <span class="text-lg">{{ platform.icon }}</span>
          <span class="text-sm font-medium text-text-primary">{{ platform.name }}</span>
        </div>
      </div>

      <p class="text-center mt-8 text-sm text-text-muted">
        ...以及 Twitter/X、Instagram、Facebook、Vimeo、Dailymotion、SoundCloud 等 1800+ 平台
      </p>
    </div>
  </section>
</template>

<script setup>
const platforms = [
  { icon: '▶️', name: 'YouTube' },
  { icon: '📺', name: 'Bilibili' },
  { icon: '🎵', name: '抖音 / TikTok' },
  { icon: '🐦', name: 'Twitter / X' },
  { icon: '📷', name: 'Instagram' },
  { icon: '📘', name: 'Facebook' },
  { icon: '🎬', name: 'Vimeo' },
  { icon: '🔴', name: 'Reddit' },
  { icon: '📌', name: 'Pinterest' },
  { icon: '💬', name: '微博' },
  { icon: '🎮', name: 'Twitch' },
  { icon: '🎧', name: 'SoundCloud' },
]
</script>
