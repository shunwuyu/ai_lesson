<script setup>
import { ref } from 'vue'
const title = ref('极客时间')

setTimeout(() => {
  title.value = '极客邦'
}, 3000)
</script>

<template>
  <div>
    {{title}}
    <input v-model="title" type="text" />
  </div>
  
</template>

<style scoped>

</style>
