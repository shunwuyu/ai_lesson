<template>
  <div>
    <p>Mouse X: {{ x }}</p>
    <p>Mouse Y: {{ y }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义响应式的 x 和 y 坐标
const x = ref(0);
const y = ref(0);

// 更新鼠标位置的函数
const updateMousePosition = (event) => {
  x.value = event.clientX;
  y.value = event.clientY;
};

// 在组件挂载后添加事件监听
onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition);
});

// 在组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition);
});
</script>
