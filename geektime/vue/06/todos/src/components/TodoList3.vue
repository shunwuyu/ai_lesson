<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
let title = ref("");
let todos = ref([{title:'学习Vue',done:false}])

function addTodo() {
  todos.value.push({
    title: title.value,
    done: false,
  });
  title.value = "";
}
</script>