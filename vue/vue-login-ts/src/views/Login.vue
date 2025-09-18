<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="用户名" required />
      <input v-model="password" type="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const data = await login({ username: username.value, password: password.value })
    userStore.setToken(data.token)
    userStore.setUsername(data.username)
    router.push('/')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 100px auto;
}
</style>