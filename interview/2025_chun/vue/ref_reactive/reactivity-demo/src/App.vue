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

// ref 
import { ref } from "./reactivity"

const r = ref(0)
let val2
effect(() => {
  val2 = r.value
})
// expect(val).toBe(0)
console.log(val2)
r.value++
console.log(val2)
</script>

<template>
  <div>
  </div>
</template>

<style scoped>

</style>
