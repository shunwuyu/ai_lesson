<template>
  <div>
    <h1>这是首页</h1>
    {{x}} {{y}}
    <!-- 
    组件化
    通过这种方式，你可以实现对业务逻辑的复用。
    这样做的好处就是，如果有其他页面也需要用到这个功能，可以直接复用过去。 -->
    <TodoList />    
  </div>  
</template>

<script setup>
import TodoList from './components/TodoList.vue'
import { useMouse } from './hooks/useMouse.js'
let { x, y } = useMouse()

</script>