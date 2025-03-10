<script setup>
// 先调用接口
// import { effect } from "@vue/reactivity"
// import { reactive } from '@vue/reactivity'
import { effect, reactive } from "./reactivity"
const ret = reactive({ num: 0 })
let val
effect(() => {
  val = ret.num
  console.log(val);
})

ret.num++
console.log(val);
ret.num = 10
console.log(val);

</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>
