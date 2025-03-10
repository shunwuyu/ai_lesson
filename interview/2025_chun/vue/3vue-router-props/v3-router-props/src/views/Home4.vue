<template>
  <div>
    <h1>Home Page</h1>
    <router-link :to="{ name: 'UserProfile', params: { id: 123 } }">Go to User with Query Params</router-link>
  </div>
</template>

<script setup>
</script>