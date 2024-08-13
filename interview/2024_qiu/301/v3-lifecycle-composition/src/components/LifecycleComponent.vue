<template>
  <div>
    <p>Lifecycle Component - Count: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const props = defineProps(['count']);
const interval = ref(null);

onBeforeMount(() => {
  console.log('beforeMount');
});

onMounted(() => {
  console.log('mounted');
  interval.value = setInterval(() => {
    console.log('Component is alive');
  }, 1000);
});

onBeforeUpdate(() => {
  console.log('beforeUpdate');
});

onUpdated(() => {
  console.log('updated');
});

onBeforeUnmount(() => {
  console.log('beforeUnmount');
});

onUnmounted(() => {
  console.log('unmounted');
  clearInterval(interval.value);
});
</script>
