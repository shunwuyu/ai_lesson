<script setup>
// 在 React 里，当父组件的状态改变时，父组件会重新渲染，
// 而 React 默认会重新渲染其所有子组件。这是因为 React 采用
// 声明式渲染，父组件状态改变会触发组件树的更新，
// 即使子组件的 props 没有改变。
// 可以使用 React.memo（函数组件）
// Vue 采用响应式系统，当父组件状态改变时，Vue 会追踪依赖，
// 仅更新受影响的 DOM 节点。Vue 会比较新旧虚拟 DOM 树，
// 找出差异并只更新需要更新的部分。
import Child from './components/Child.vue';
import { ref } from 'vue';

const count = ref(0)
const increment = () => {
  count.value++
}
</script>


<template>
  <div>
    {{count}}
    <button @click="increment">+1</button>    
    <Child />
  </div>
</template>

<style scoped>

</style>
