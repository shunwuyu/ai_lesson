<template>
    <div>
      <h2>View Two</h2>
      <input v-model="text" placeholder="Type something..." />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const text = ref('')
  </script>
  