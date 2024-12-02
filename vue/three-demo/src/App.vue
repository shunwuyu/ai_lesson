<template>
  <div class="main">
    <Layout></Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from './layout/index.vue';

</script>

<style>
body, html {
  background-color: #000;
}
body {
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
}
</style>