<template>
  <Teleport to="body">
    <div v-if="visible" class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="$emit('close')">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-modal-in">
        <!-- Header -->
        <div class="px-8 pt-8 pb-4">
          <div class="flex items-center justify-between mb-1">
            <h2 class="text-xl font-bold text-text-primary">
              {{ isLogin ? '登录账号' : '注册账号' }}
            </h2>
            <button @click="$emit('close')" class="p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-text-secondary">
            {{ isLogin ? '登录以使用 AI 视频总结和 VIP 功能' : '创建账号，开始使用全部功能' }}
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="px-8 pb-8">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1.5">邮箱地址</label>
              <input
                v-model="email"
                type="email"
                required
                placeholder="your@email.com"
                class="w-full h-11 px-4 rounded-xl border border-border bg-white text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                :disabled="submitting"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1.5">密码</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  minlength="6"
                  placeholder="至少 6 位密码"
                  class="w-full h-11 px-4 pr-11 rounded-xl border border-border bg-white text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  :disabled="submitting"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary cursor-pointer">
                  <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div v-if="error" class="mt-4 p-3 rounded-xl bg-red-50 border border-red-100">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="submitting"
            class="w-full h-11 mt-6 rounded-full bg-primary text-white text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ submitting ? '请稍候...' : (isLogin ? '登录' : '注册') }}
          </button>

          <p class="mt-4 text-center text-sm text-text-secondary">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <button type="button" @click="toggleMode" class="text-primary font-medium hover:underline cursor-pointer">
              {{ isLogin ? '立即注册' : '去登录' }}
            </button>
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { register, login } from '../api/auth'

const props = defineProps({
  visible: Boolean,
  initialMode: { type: String, default: 'login' },
})

const emit = defineEmits(['close', 'success'])

const isLogin = ref(props.initialMode === 'login')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const submitting = ref(false)
const error = ref('')

function toggleMode() {
  isLogin.value = !isLogin.value
  error.value = ''
}

async function handleSubmit() {
  error.value = ''
  submitting.value = true
  try {
    const user = isLogin.value
      ? await login(email.value, password.value)
      : await register(email.value, password.value)
    emit('success', user)
    emit('close')
    email.value = ''
    password.value = ''
  } catch (err) {
    const msg = err.response?.data?.detail || err.message || '操作失败'
    error.value = typeof msg === 'string' ? msg : JSON.stringify(msg)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@keyframes modal-in {
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modal-in 0.2s ease-out;
}
</style>
