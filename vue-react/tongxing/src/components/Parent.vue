<template>
  <div>
    <Child ref="comp"></Child>
    <button @click="handlerClick">按钮</button>
  </div>
</template>

<script setup>
  import Child from "./Child.vue"
  import { ref } from "vue"
  
  const comp = ref(null)
  const handlerClick = () => {
      console.log(comp.value.childName) // 获取子组件对外暴露的属性
      comp.value.someMethod() // 调用子组件对外暴露的方法
  }
  // 或者复杂类型
  // const msg2 = reactive(["这是传级子组件的信息2"])
</script>

<style scoped>

</style>