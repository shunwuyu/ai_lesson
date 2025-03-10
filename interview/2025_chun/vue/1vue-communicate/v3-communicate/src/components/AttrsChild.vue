<template>
  <div>

  </div>
</template>

<script setup>
import { defineProps,  useAttrs } from "vue"
// 3.2版本不需要引入 defineProps，直接用
const props = defineProps({
    msg1: String,
    msg2: String
})
// 包含父作用域里除 class 和 style 除外的非 props 属性集合
const attrs = useAttrs()
console.log(attrs) // { msg2:"2222", title: "3333" }
</script>

<style scoped>

</style>