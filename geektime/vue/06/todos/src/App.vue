<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
    <button @click="increment">Increase Count</button>
    <button @click="toggleStatus">Toggle Status</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// 逻辑组合（Logical Composition）：把同一功能的响应式状态、方法、副作用等组合在一起；
// Composition API 是为了更好地组织和复用逻辑，而非仅仅提供新语法。
// 状态 1：计数器
const count = ref(0)
// 方法 1：增加计数
const increment = () => {
  count.value++
}

// 状态 2：激活状态
const isActive = ref(false)
// 方法 2：切换状态
const toggleStatus = () => {
  isActive.value = !isActive.value
}

// 生命周期：组件挂载完成
onMounted(() => {
  console.log('Component mounted!')
})




</script>