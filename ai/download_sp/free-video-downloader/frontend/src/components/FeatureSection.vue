<template>
  <section id="features" class="py-16 sm:py-20 bg-bg-section" aria-labelledby="features-heading">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <h2 id="features-heading" class="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          为什么选择 <span class="text-primary">SaveAny</span> 视频下载器
        </h2>
        <p class="text-text-secondary text-base max-w-xl mx-auto">
          简单、快速、强大的在线视频下载体验，支持 AI 智能总结
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="group bg-white rounded-2xl p-6 border border-border-light shadow-sm hover:shadow-md hover:border-primary/20 transition-all"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
            :class="feature.bgClass" role="img" :aria-label="feature.title">
            {{ feature.icon }}
          </div>
          <h3 class="text-base font-semibold text-text-primary mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-text-secondary leading-relaxed">{{ feature.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '🌐',
    title: '支持 1800+ 平台',
    desc: 'YouTube、Bilibili、抖音、TikTok、Twitter、Instagram 等全球主流平台',
    bgClass: 'bg-blue-50',
  },
  {
    icon: '⚡',
    title: '极速解析下载',
    desc: '智能解析视频链接，自动匹配最优下载方式，速度快人一步',
    bgClass: 'bg-amber-50',
  },
  {
    icon: '📱',
    title: '手机也能用',
    desc: '完美适配手机浏览器，随时随地，想下就下，无需安装任何 App',
    bgClass: 'bg-green-50',
  },
  {
    icon: '🎬',
    title: '多种清晰度',
    desc: '支持从 360p 到 4K 多种清晰度选择，满足不同场景需求',
    bgClass: 'bg-purple-50',
  },
  {
    icon: '🤖',
    title: 'AI 视频总结',
    desc: 'AI 智能分析视频内容，一键生成摘要、思维导图，还能针对视频提问',
    bgClass: 'bg-rose-50',
  },
]
</script>
