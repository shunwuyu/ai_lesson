<script setup>
import { ref } from 'vue'
const title = ref('极客时间')
// const todos = ref(['吃饭','睡觉'])
// const addTodo = () => { 
//   todos.value.push(title.value)
//   title.value = "";
// }
const todos = ref([ 
  {title:'吃饭',done:false}, 
  {title:'睡觉',done:true} 
])

const addTodo = () =>{ 
  console.log('////')
  todos.value.push({ 
    title:title.value, 
    done:false 
  })
  title.value = "";
}

</script>

<template>
  <div>
    {{title}}
    <input v-model="title" type="text" @keydown.enter="addTodo"/>
    <ul>
      <!-- <li v-for="todo in todos">{{todo}}</li> -->
       <li v-for="todo in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done">
        <span :class="{done:todo.done}">{{todo.title}}</span>
       </li>
    </ul>
    <div>
    {{todos.filter(v=>!v.done).length}} 
    /
    {{todos.length}}
    </div>
  </div>
  
</template>

<style scoped>
.done{ color:gray; text-decoration: line-through; }
</style>
