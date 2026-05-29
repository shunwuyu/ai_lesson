<template>
  <ul>
    <li v-for="user in users" :key="user.id">
      <slot :user="user"></slot>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const users =  ref([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
])
    
</script>