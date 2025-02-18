<template>
  <div class="home">
    <h1>首页</h1>
    <p>这是首页的内容。</p>
    <input v-model="message" placeholder="输入一些内容" />
    <p>你输入的内容是: {{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('');
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>