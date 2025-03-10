<template>
  <div>
    <h1>Home Page</h1>
    <button @click="goToUser(123)">Go to User 123</button>
    <!-- <button @click="goToUserWithQuery()">Go to User with Query Params</button> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToUser(id) {
    router.push({ name: 'UserProfile', params: { id } });
}

// function goToUserWithQuery() {
//     router.push({ name: 'UserProfile', params: { id: 123, name: 'John' } });
// }
</script>