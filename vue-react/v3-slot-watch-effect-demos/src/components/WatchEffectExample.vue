<template>
  <div>
    <p>计数器: {{ count }}</p>
    <button @click="increment">增加</button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

// 定义响应式数据
const count = ref(0);

// 定义更新方法
const increment = () => {
  count.value++;
};

// 使用 watchEffect 监听 count 的变化并立即执行
watchEffect(() => {
  console.log(`当前 count 的值是 ${count.value}`);
});
</script>