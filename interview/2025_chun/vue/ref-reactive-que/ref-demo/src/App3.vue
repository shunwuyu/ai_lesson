<template>
  <div>
    <p>用户名：{{ user.name }}</p>
    <p>年龄：{{ user.age }}</p>
    <button @click="user.age++">年龄 +1</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const user = reactive({
  name: '张三',
  age: 18
})
</script>
