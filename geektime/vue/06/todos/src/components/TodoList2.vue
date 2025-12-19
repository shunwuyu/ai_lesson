<template>
  <div>
    <h1 @click="add">{{count}}</h1>
  </div>
</template>

<script setup>
// setup 标记我们使用 <script setup>的语法
{/* <script setup>标签内定义的变量和函数，都可以在模板中直接使用。 */}
  // Vue 3 的 Composition API 是一种以函数形式组织和复用逻辑代码的新方式，通过 setup() 
  // 函数和响应式函数（如 ref、reactive）让组件逻辑更清晰、灵活和可维护。
import { ref } from "vue"; // composition api 
let count = ref(1)
function add(){
    count.value++
}
</script>

<style>
h1 {
  color: red;
}
</style>