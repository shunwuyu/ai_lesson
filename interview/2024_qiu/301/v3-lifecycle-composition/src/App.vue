<template>
  <div>
    <button @click="toggleComponent">Toggle Component</button>
    <button @click="incrementCount">Increment Count</button>
    <p>Count: {{ count }}</p>
    <LifecycleComponent v-if="showComponent" :count="count" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LifecycleComponent from './components/LifecycleComponent.vue';

const showComponent = ref(true);
const count = ref(0);

const toggleComponent = () => {
  showComponent.value = !showComponent.value;
};

const incrementCount = () => {
  count.value++;
};
</script>
