<script setup>
  import { ref } from 'vue'
  const title = ref('极客时间')

  const todos = ref([ 
    '吃饭','睡觉'
  ])
  const addTodo = () => {
    todos.value.push(title.value)
    title.value = "";
  }
  
  </script>
  
  <template>
    <div>
      {{title}}
      <input v-model="title" type="text" @keydown.enter="addTodo"/>
      <ul>
        <li v-for="todo in todos">{{todo}}</li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .done{ color:gray; text-decoration: line-through; }
  </style>
  