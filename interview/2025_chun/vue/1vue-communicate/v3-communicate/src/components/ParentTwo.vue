<template>
  <div>
    ParentTwo
  </div>
</template>

<script setup>
import ChildTwo from "./ChildTwo.vue"
import { ref, reactive } from "vue"
const msg2 = ref("这是传给子组件的信息2")
// 或者复杂类型
// const msg2 = reactive(["这是传级子组件的信息2"])
</script>

<style scoped>

</style>