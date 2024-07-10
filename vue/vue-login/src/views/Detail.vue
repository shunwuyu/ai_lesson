<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-md p-8 mt-8">
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
      <div class="text-gray-700 mb-4">
        <p v-html="post.category"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '../api/index'

const route = useRoute()
const post = ref({});

const id = route.params.id

onMounted(async () => {
    const data = await getPostById(id)
    console.log(data)
    post.value = data.data
})
</script>