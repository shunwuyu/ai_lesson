<!-- src/App.vue -->
<template>
  <div id="app">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">My App</h1>
            </div>
          </div>
          <div class="flex items-center">
            <button
              v-if="!authStore.isAuthenticated"
              @click="showAuthForm = true"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login / Register
            </button>
            <div v-else class="flex items-center space-x-4">
              <span class="text-gray-700">Hello, {{ authStore.user?.email }}</span>
              <button
                @click="authStore.signOut()"
                class="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="authStore.isAuthenticated">
          <h2 class="text-2xl font-bold text-gray-900">Welcome to your dashboard!</h2>
          <!-- 受保护的页面内容 -->
        </div>
        <div v-else>
          <p class="text-lg text-gray-600">Please log in to access the content.</p>
        </div>
      </div>
    </main>

    <!-- 模态框或路由来显示 AuthForm -->
    <!-- 这里简化处理，直接在需要时显示 -->
    <AuthForm v-if="showAuthForm" @close="showAuthForm = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from './stores/authStore'
import AuthForm from './components/AuthForm.vue'

const authStore = useAuthStore()
const showAuthForm = ref(false)
</script>