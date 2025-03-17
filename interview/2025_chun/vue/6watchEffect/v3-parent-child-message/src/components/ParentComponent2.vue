<template>
  <ChildComponent ref="childRef" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ChildComponent from './ChildComponent2.vue';

const childRef = ref();

watch(
  () => childRef.value?.internalData,
  (newVal) => {
    console.log('子组件数据变化:', newVal);
  },
  { deep: true }
);
</script>