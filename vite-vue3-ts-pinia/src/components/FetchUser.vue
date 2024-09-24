<template>
    <div>
      <h1>User List</h1>
      <ul v-if="users.length > 0">
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      </ul>
      <p v-if="loading">Loading...</p>
      <p v-if="error">{{ error.message }}</p>
    </div>
  </template>
  
  <script setup>

  import { useRequest } from '../hooks/useRequest';
  import axios from 'axios';

  // 定义一个异步函数来获取用户数据
  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response;
  };
  
  // 使用 useRequest 来处理异步请求
  const { data:users, loading, error } = useRequest(fetchUsers);
  
 
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