<template>
  <div>
    <button @click="active = 'A'">Tab A</button>
    <button @click="active = 'B'">Tab B</button>

    <div v-show="active === 'A'">
      <h3>内容 A</h3>
      <p>这里是 A 页的内容。</p>
    </div>

    <div v-show="active === 'B'">
      <h3>内容 B</h3>
      <p>这里是 B 页的内容。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active = ref('A')
</script>
