// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { supabase } from '../lib/supabase'
import { ref, computed } from 'vue'
import type { User, Session } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const state = ref<AuthState>({
    user: null,
    session: null,
    loading: false,
    error: null
  })

  // 计算属性
  const isAuthenticated = computed(() => !!state.value.user)

  // 登录
  const signIn = async (email: string, password: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      state.value.user = data.user
      state.value.session = data.session
    } catch (error: any) {
      state.value.error = error.message
    } finally {
      state.value.loading = false
    }
  }

  // 注册
  const signUp = async (email: string, password: string) => {
    state.value.loading = true
    state.value.error = null
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      // signUp 成功后，user 可能为 null（需要确认邮箱），但 session 可能存在（如果允许即时登录）
      state.value.user = data.user
      state.value.session = data.session
      // 通常需要检查 data.user?.confirmed_at 或发送确认邮件
    } catch (error: any) {
      state.value.error = error.message
    } finally {
      state.value.loading = false
    }
  }

  // 登出
  const signOut = async () => {
    state.value.loading = true
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      state.value.user = null
      state.value.session = null
    } catch (error: any) {
      state.value.error = error.message
    } finally {
      state.value.loading = false
    }
  }

  // 检查初始会话 (在应用启动时调用)
  const checkSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error)
    } else {
      state.value.session = session
      state.value.user = session?.user || null
    }
  }

  // 监听 auth 状态变化
  supabase.auth.onAuthStateChange((event, session) => {
    state.value.session = session
    state.value.user = session?.user || null
    // 可以在这里处理不同事件 (SIGNED_IN, SIGNED_OUT, etc.)
  })

  return {
    // state
    ...state.value,
    // getters
    isAuthenticated,
    // actions
    signIn,
    signUp,
    signOut,
    checkSession,
  }
})