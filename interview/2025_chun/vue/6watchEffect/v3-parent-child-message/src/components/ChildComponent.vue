<template>
  <div>
    <button @click="increment">计数: {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const emit = defineEmits(['count-changed']); // 声明自定义事件

const increment = () => {
  count.value++;
  emit('count-changed', count.value); // 触发事件并传递数据
};
</script>