<template>
  <div>
    <h1>Home Page</h1>
    <router-link :to="{ name: 'UserProfile', params: { id: 123 } }">Go to User 123</router-link>
    <router-link :to="{ name: 'UserProfile', params: { id: 456 } }">Go to User 456</router-link>
  </div>
</template>

<script setup>
</script>