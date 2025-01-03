<template>
  <div>PostIndex {{ sort }}</div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  sort: String,
});

</script>