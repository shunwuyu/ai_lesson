<script setup>
import { ref, computed } from 'vue'
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

const active = computed(()=>todos.value.filter(v=>!v.done).length)
const all = computed(()=>todos.value.length)

const allDone = computed({
  get() {
    return active.value === 0
    // 或直接：return todos.value.every(todo => todo.done)
  },
  set(val) {
    todos.value.forEach(todo => {
      todo.done = val
    })
  }
})

const addTodo = () =>{ 
  console.log('////')
  todos.value.push({ 
    title:title.value, 
    done:false 
  })
  title.value = "";
}

function clear() {
  todos.value = todos.value.filter(v => !v.done)
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
    <button v-if="active<all" @click="clear">清理</button>
    全选 <input type="checkbox" v-model="allDone"/>
  </div>
  
</template>

<style scoped>
.done{ color:gray; text-decoration: line-through; }
</style>
