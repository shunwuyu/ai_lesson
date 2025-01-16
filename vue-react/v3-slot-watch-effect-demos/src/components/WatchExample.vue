<template>
  <div>
    <p>计数器: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 定义响应式数据
const count = ref(0);

// 定义更新方法
const increment = () => {
  count.value++;
};

// 使用 watch 监听 count 的变化
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`);
});
</script>