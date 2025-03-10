<template>
  <div>
    <ExposeChild ref="comp"></ExposeChild>
    <button @click="handlerClick">按钮</button>
  </div>
</template>
<script setup>
  import ExposeChild from "./ExposeChild.vue"
  import { ref } from "vue"
  const comp = ref(null)
  const handlerClick = () => {
      console.log(comp.value.childName) // 获取子组件对外暴露的属性
      comp.value.someMethod() // 调用子组件对外暴露的方法
  }
</script>