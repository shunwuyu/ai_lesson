<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id; // 通过 route.params 获取 URL 参数
</script>