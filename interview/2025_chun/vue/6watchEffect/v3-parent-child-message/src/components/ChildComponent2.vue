<template>
  <div>{{ internalData }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const internalData = ref('子组件数据');

// 暴露数据给父组件
defineExpose({
  internalData
});

setTimeout(() => {
  internalData.value = 'haha'
}, 1000)
</script>