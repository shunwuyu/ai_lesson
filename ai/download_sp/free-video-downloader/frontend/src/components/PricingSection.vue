<template>
  <section id="pricing" class="py-16 sm:py-20 bg-white" aria-labelledby="pricing-heading">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12">
        <h2 id="pricing-heading" class="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          选择适合你的视频下载方案
        </h2>
        <p class="text-text-secondary text-base max-w-xl mx-auto">
          免费版满足日常视频下载需求，VIP 解锁无限 AI 视频总结等全部高级功能
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <!-- 免费版 -->
        <div class="bg-white rounded-2xl border border-border p-7 flex flex-col">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-text-primary mb-1">免费版</h3>
            <p class="text-sm text-text-secondary">满足基础下载需求</p>
          </div>
          <div class="mb-6">
            <span class="text-4xl font-bold text-text-primary">¥0</span>
            <span class="text-text-muted text-sm ml-1">/永久</span>
          </div>
          <ul class="space-y-3 mb-8 flex-1">
            <li v-for="item in freePlan" :key="item" class="flex items-start gap-2.5 text-sm text-text-secondary">
              <svg class="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ item }}
            </li>
          </ul>
          <button
            class="w-full h-11 rounded-full border border-border text-sm font-medium text-text-primary transition-colors"
            :class="user ? 'bg-gray-50 cursor-default' : 'hover:bg-gray-50 cursor-pointer'"
            @click="!user && $emit('need-login')"
          >
            {{ user ? '当前方案' : '免费注册' }}
          </button>
        </div>

        <!-- VIP 版 -->
        <div class="relative bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-7 flex flex-col text-white overflow-hidden">
          <div class="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            🔥 推荐
          </div>
          <div class="absolute -top-20 -right-20 w-56 h-56 bg-white/5 rounded-full"></div>
          <div class="relative">
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-1">VIP 高级版</h3>
              <p class="text-sm text-white/70">解锁全部功能，无限制使用</p>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold">¥9.9</span>
              <span class="text-white/70 text-sm ml-1">/月</span>
              <span class="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">限时优惠</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li v-for="item in vipPlan" :key="item" class="flex items-start gap-2.5 text-sm text-white/90">
                <svg class="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ item }}
              </li>
            </ul>
            <button
              @click="handleVipClick"
              class="w-full h-11 rounded-full bg-white text-primary text-sm font-semibold hover:bg-white/90 transition-colors shadow-lg cursor-pointer"
            >
              {{ user?.is_vip ? '续费 VIP' : '立即开通 VIP' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  user: { type: Object, default: null },
})

const emit = defineEmits(['open-vip', 'need-login'])

const freePlan = [
  '无限次视频下载',
  '支持 1800+ 平台',
  '基础视频信息解析',
  `每日 3 次 AI 视频总结`,
]

const vipPlan = [
  '无限次 AI 视频总结',
  'AI 思维导图生成',
  'AI 视频问答',
  '字幕下载与导出',
  '专属客服优先支持',
]

function handleVipClick() {
  if (!props.user) {
    emit('need-login')
    return
  }
  emit('open-vip')
}
</script>
