<template>
  <div>
    <EmitChild @myClick="onMyClick"></EmitChild>
  </div>
</template>

<script setup>
import EmitChild from "./EmitChild.vue"
const onMyClick = (msg) => {
    console.log(msg) // 这是父组件收到的信息
}
</script>

<style  scoped>

</style>