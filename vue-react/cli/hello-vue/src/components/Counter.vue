<template>
  <div class="counter">
    <!-- 显示 count 的值 -->
    <p>Count: {{ count }}</p>
    <!-- 按钮，点击后调用 increment 方法 -->
    <button @click="increment">+1</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式数据
const count = ref(0);

// 定义方法
const increment = () => {
  count.value++;
};
</script>

<style scoped>
/* 添加一些简单的样式 */
.counter {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>