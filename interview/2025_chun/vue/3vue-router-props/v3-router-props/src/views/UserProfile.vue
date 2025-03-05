<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ id }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['id']); // 直接通过 props 接收参数
</script>