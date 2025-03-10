<template>
  <div>
    <button @click="handleClick">点击</button>
    
  </div>
</template>

<script setup>
import mitter from '../mitt.js'
const handleClick = () => {
  mitter.emit('handleChange')
}
</script>

<style scoped>

</style>