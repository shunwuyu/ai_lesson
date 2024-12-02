<script setup>
import { useFetch } from '@vueuse/core'

const { data: users, pending, error } = useFetch(
  'https://jsonplaceholder.typicode.com/users'
).get().json()
</script>

<template>
<div>
  <h1>User List</h1>
  <ul v-if="users && users.length > 0">
    <li v-for="user in users" :key="user.id">
    {{user.name}}
    </li>
  </ul>
  <p v-if="pending">Loading</p>
  <p v-if="error">{{error.message}}</p>
</div> 
</template>

<style scoped>

</style>
