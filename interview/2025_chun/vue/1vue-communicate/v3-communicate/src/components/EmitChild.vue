<template>
  <div>
    <button @click="handleClick">按钮</button>
    <button @click="emit('myClick', 'hello')">按钮</button>
  </div>
</template>

<script setup>
// 方法一 适用于Vue3.2版本 不需要引入
// import { defineEmits } from "vue"
// 对应写法一
const emit = defineEmits(["myClick"])
// 对应写法二
const handleClick = ()=>{
    emit("myClick", "这是发送给父组件的信息")
}

</script>

<style scoped>

</style>