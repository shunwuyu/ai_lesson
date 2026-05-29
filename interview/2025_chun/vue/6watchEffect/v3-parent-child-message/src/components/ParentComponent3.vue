<template>
  <ChildComponent v-model="parentData" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ChildComponent from './ChildComponent3.vue';

const parentData = ref('');

watch(parentData, (newVal) => {
  console.log('子组件数据变化:', newVal);
});
</script>