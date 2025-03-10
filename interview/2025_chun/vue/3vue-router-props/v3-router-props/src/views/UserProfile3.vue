<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ id }}</p>
    <p>User Name: {{ name }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.query.id; // 通过 route.query 获取查询参数
const name = route.query.name;
</script>