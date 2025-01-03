<template>
  <div>PostShow {{ postId }}</div>
  <router-view></router-view>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

defineProps({
  postId: String,
});

onMounted(() => {
  console.log(route.params.postId);
});
</script>