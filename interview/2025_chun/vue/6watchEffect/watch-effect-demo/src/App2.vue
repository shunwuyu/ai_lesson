<script setup>
import { ref, watch } from 'vue';
const count = ref(0);

// watch(count, (newVal, oldVal) => {
//   console.log(`count changed from ${oldVal} to ${newVal}`);
// });

watch(count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
}, {
  immediate: true, // 立即执行一次回调函数
});

// 修改 count 的值会触发 watch 回调
count.value++;
</script>

<template>
  <div>
  {{ count }}
  </div>
</template>

<style scoped>

</style>
