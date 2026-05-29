<template>
  <ChildComponent @count-changed="handleCountChange" />
</template>

<script setup lang="ts">
import ChildComponent from './ChildComponent.vue';

const handleCountChange = (newCount) => {
  console.log('子组件count变化:', newCount);
};
</script>