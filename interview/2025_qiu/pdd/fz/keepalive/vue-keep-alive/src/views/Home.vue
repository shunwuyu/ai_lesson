<template>
  <div>
    <h2>🏠 Home 页面</h2>
    <input v-model="text" placeholder="输入点什么试试看" />
    <p>输入内容：{{ text }}</p>
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'

const text = ref('')

onMounted(() => console.log('📦 Home 挂载'))
onUnmounted(() => console.log('❌ Home 卸载'))
onActivated(() => console.log('✅ Home 激活'))
onDeactivated(() => console.log('🕓 Home 被缓存'))
</script>
