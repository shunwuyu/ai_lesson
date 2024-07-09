<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
        <input type="text" id="username" v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
        <input type="password" id="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
    </form>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue'



    const username = ref('')
    const password = ref('')

    const handleSubmit = () => {
        console.log(username.value, password.value, '??')
      if (username.value === 'admin' && password.value === '123456') {
        localStorage.setItem('isLoggedIn','true')
        location.href="/"
        // Redirect to home or any other page after successful login
      } else {
        alert('Invalid credentials')
      }
    }

   
</script>