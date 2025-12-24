<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Status: {{ isActive ? 'Active' : 'Inactive' }}</p>
    <button @click="increment">Increase Count</button>
    <button @click="toggleStatus">Toggle Status</button>
  </div>
</template>

<script>
export default {
  name: 'ExampleComponent',
  data() {
    return {
      // 状态 1：计数器
      count: 0,
      // 状态 2：激活状态
      isActive: false
    }
  },
  mounted() {
    // 生命周期：组件挂载完成
    console.log('Component mounted!')
  },
  methods: {
    // 方法 1：增加计数
    increment() {
      this.count++
    },
    // 方法 2：切换状态
    toggleStatus() {
      this.isActive = !this.isActive
    }
  }
}
</script>