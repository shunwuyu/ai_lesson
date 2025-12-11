<script setup>
  import { ref } from 'vue'
  const title = ref('极客时间')

  const todos = ref([ 
    {
      title:'吃饭',done:false
    },
    {
      title:'睡觉',done:true
    }
  ])
  const addTodo = () => {
    todos.value.push({
      title:this.title,
      done: false
    })
    title.value = "";
  }
  
  </script>
  
  <template>
    <div>
      {{title}}
      <input v-model="title" type="text" @keydown.enter="addTodo"/>
      <ul>
        <li v-for="todo in todos">
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
  