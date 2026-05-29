<template>
  <div>
    {{count}}
    {{double}}
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const count = ref(0);
const double = ref(0);

watchEffect(() => {
  double.value = count.value * 2;
  console.log(`double is ${double.value}`);
});

// 修改 count 的值会触发 watchEffect 回调
count.value++;
</script>

<style scoped>

</style>