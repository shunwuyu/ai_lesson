<template>
  <div>
    <Child />
  </div>
</template>

<script setup>
import Child from "./Child.vue"
import { provide } from "vue"
provide("name", "沐华")
</script>

<style scoped>

</style>