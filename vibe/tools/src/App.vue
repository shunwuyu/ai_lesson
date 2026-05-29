<script setup lang="ts">
import LuckyDraw from './components/LuckyDraw.vue';
</script>

<template>
  <div class="app">
    <LuckyDraw />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.app {
  padding: 20px;
}
</style>
