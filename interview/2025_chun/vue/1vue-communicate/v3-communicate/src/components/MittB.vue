<template>
  <div>
ddddddd
  </div>
</template>

<script setup>
import mitter from '../mitt'
import { onUnmounted } from 'vue'
const someMethed = () => { 
  console.log('//////////')
 }
mitter.on('handleChange',someMethed)
onUnmounted(()=>{
    mitt.off('handleChange',someMethed)
})

</script>

<style scoped>

</style>