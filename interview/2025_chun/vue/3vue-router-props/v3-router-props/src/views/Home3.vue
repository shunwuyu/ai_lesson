<template>
  <div>
    <h1>Home Page</h1>
    <router-link :to="{ name: 'UserProfile', query: { id: 123, name: 'John' } }">Go to User with Query Params</router-link>
  </div>
</template>

<script setup>
</script>