<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Welcome to the Home Page</h1>
    <p>This is the home page content.</p>
    <h1 class="text-3xl font-bold mb-6">Posts List</h1>
    <div v-for="post in state.posts" :key="post.id" class="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 class="text-xl font-semibold mb-2">
        <router-link :to="{ name: 'Detail', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </h2>
      <p class="text-gray-700">{{ post.category }}</p>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { getPosts } from '../api/index'

const state = reactive({
    posts:[]
})

onMounted(async () => {
    const data = await getPosts()
    console.log(data);
    state.posts = data.data
})
</script>

