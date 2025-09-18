<template>
  <section class="flex flex-col gap-10">
    <CategoryCarousel
      v-for="id in HOME_PAGE_CATEGORIES_ID"
      :key="id"
      :category-id="id"
    />
  </section>
</template>

<script setup lang="ts">
const HOME_PAGE_CATEGORIES_ID = ['1d16297a-68c0-423a-8ff2-4376cccd266e', '600ad3e4-0b38-4079-869d-bd62825b498f', 'e693ead8-4455-46b4-a75c-bf313d8ac2e4']
</script>