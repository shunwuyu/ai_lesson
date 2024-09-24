<template>
    <div>
      <h1>User List</h1>
      <ul v-if="users && users.length > 0">
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      </ul>
      <p v-if="pending">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script setup>
  import { useFetch } from '@vueuse/core';
  
  // 使用 useFetch 请求数据
  const { data: users, pending, error } = useFetch('https://jsonplaceholder.typicode.com/users').get().json();
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  </style>