<script setup>
import { ref } from 'vue'
import Rate from './components/Rate1.vue'

let score = ref(3)
function update(num){ score.value = num}
</script>

<template>
  <div>
    <Rate :value="score" />
    <Rate :value="4" theme="red"/>
    你的评分是 {{score}}
    <Rate :value="score" @update-rate="update"/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
