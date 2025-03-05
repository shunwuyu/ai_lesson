<template>
  <div>
    {{name}}
  </div>
</template>

<script setup>
import { inject } from "vue"
const name = inject("name")
console.log(name) // 沐华
</script>

<style scoped>

</style>