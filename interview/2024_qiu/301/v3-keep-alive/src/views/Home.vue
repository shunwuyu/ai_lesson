<template>
  <div>
    <h1>Home</h1>
    <p>This component is kept alive.</p>
  </div>
</template>

<script setup>
import { onActivated, onDeactivated } from 'vue';

onActivated(() => {
  console.log('Home component activated');
});

onDeactivated(() => {
  console.log('Home component deactivated');
});
</script>
