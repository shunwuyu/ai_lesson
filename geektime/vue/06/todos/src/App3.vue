<template>
  <div>
    <h1>Style Scoped</h1>
    <h1 @click="add">{{ count }}</h1>
    <StyleDemo />
  </div>  
</template>

<script setup>
  import { ref } from "vue";
  import StyleDemo from './components/StyleDemo.vue'
  // 如果没有setup 写出下面这样的代码来实现累加器。
  // setup 函数中，返回所有需要在模板中使用的变量和方法。
  // 使用 <script setup>可以让代码变得更加精简，这也是现在开发 Vue 3 项目必备的写法。
  // export default {
  //   setup() {
  //     let count = ref(1)
  //     function add() {
  //       count.value++
  //     }
  //     return {
  //       count,
  //       add
  //     }
  //   }
  // }

  let count = ref(1);
  let color = ref('red')
  function add() {
    count.value++;
    color.value = Math.random()>0.5? "blue":"red"
  }
  </script>
  <style scoped>
    /* 标签和样式的属性上，新增了 data- 的前缀，确保只在当前组件生效。 */
    h1 {
      /* color: red; */
      color: v-bind(color);
    }
  </style>