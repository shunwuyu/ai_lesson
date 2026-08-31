<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-3" title="SaveAny - 免费在线万能视频下载器">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-sm" role="img" aria-label="SaveAny Logo">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="text-lg font-semibold text-text-primary tracking-tight">SaveAny</span>
        <span class="hidden sm:inline text-xs text-text-muted bg-primary-light px-2 py-0.5 rounded-full">万能视频下载</span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm text-text-secondary" aria-label="主导航">
        <a href="#features" class="hover:text-primary transition-colors" title="查看SaveAny功能特性">功能特性</a>
        <a href="#how-to-use" class="hover:text-primary transition-colors" title="了解如何使用SaveAny下载视频">使用教程</a>
        <a href="#comparison" class="hover:text-primary transition-colors" title="SaveAny与其他工具对比">工具对比</a>
        <a href="#pricing" class="hover:text-primary transition-colors" title="查看SaveAny套餐价格">套餐价格</a>
      </nav>
      <div class="flex items-center gap-3">
        <!-- 未登录 -->
        <template v-if="!user">
          <button @click="$emit('login')" class="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-text-secondary hover:text-primary hover:bg-gray-50 transition-colors cursor-pointer">
            登录
          </button>
          <button @click="$emit('register')" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-white bg-primary hover:bg-blue-600 transition-colors shadow-sm cursor-pointer">
            免费注册
          </button>
        </template>

        <!-- 已登录 -->
        <template v-else>
          <button v-if="!user.is_vip" @click="$emit('open-vip')" class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-primary bg-primary-light hover:bg-blue-100 transition-colors cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            开通 VIP
          </button>
          <span v-else class="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-sm">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            VIP
          </span>

          <!-- 用户下拉菜单 -->
          <div class="relative" ref="menuRef">
            <button @click="menuOpen = !menuOpen" class="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                {{ user.email[0].toUpperCase() }}
              </div>
              <svg class="w-4 h-4 text-text-muted transition-transform" :class="{ 'rotate-180': menuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="menuOpen" class="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-border shadow-xl py-2 animate-menu-in">
              <div class="px-4 py-2 border-b border-border">
                <p class="text-sm font-medium text-text-primary truncate">{{ user.email }}</p>
                <p class="text-xs text-text-muted mt-0.5">
                  {{ user.is_vip ? 'VIP 会员' : '免费用户' }}
                  <span v-if="user.is_vip && user.vip_expire_at" class="ml-1">· 到期 {{ formatDate(user.vip_expire_at) }}</span>
                </p>
              </div>
              <button v-if="!user.is_vip" @click="menuOpen = false; $emit('open-vip')" class="w-full text-left px-4 py-2.5 text-sm text-primary hover:bg-primary-light transition-colors cursor-pointer flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                开通 VIP
              </button>
              <button @click="menuOpen = false; $emit('logout')" class="w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                退出登录
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  user: { type: Object, default: null },
})

defineEmits(['login', 'register', 'logout', 'open-vip'])

const menuOpen = ref(false)
const menuRef = ref(null)

function formatDate(isoStr) {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function handleClickOutside(e) {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    menuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
@keyframes menu-in {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-menu-in {
  animation: menu-in 0.15s ease-out;
}
</style>
