<script setup>
  import { ref, computed } from 'vue'
  const other = ref("other");
  const title = ref('极客时间')

  const todos = ref([ 
    {
      title:'吃饭',done:false
    },
    {
      title:'睡觉',done:true
    }
  ])
  // 缓存
  const active = computed(()=>todos.value.filter(v=>!v.done).length)
  const all = computed(()=>todos.value.length)
  
  const addTodo = () => {
    todos.value.push({
      title:this.title,
      done: false
    })
    title.value = "";
  }
  
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

  function clear() {
    todos.value = todos.value.filter(v => !v.done)
  }
  </script>
  
  <template>
    <div>
      {{other}}
      <input type="text" v-model="other" />
      {{title}}
      <input v-model="title" type="text" @keydown.enter="addTodo"/>
      <ul v-if="todos.length">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done">
          <span :class="{done:todo.done}">{{todo.title}}</span>
        </li>
      </ul>
      <div v-else>
        暂无待办事项
      </div>
      <div>
        {{active}} / {{all}}
      </div>
      <div>
        全选 <input type="checkbox" v-model="allDone"/>
        <button v-if="active<all" @click="clear">清理</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .done{ color:gray; text-decoration: line-through; }
  </style>
  