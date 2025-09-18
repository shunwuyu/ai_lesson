<template>
  <div>
    <h1
      v-if="categoryName"
      class="text-violet-600 font-extrabold text-center text-2xl sm:text-3xl lg:text-4xl"
    >
      {{ upperCaseCategoryName }}
    </h1>
    <div class="swiper-container relative mt-4 sm:mt-6 lg:mt-8">
      
    </div>
  </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
interface Props {
  categoryId: number
}
const props = defineProps<Props>()

import { ref, computed } from 'vue'
const categoryName = ref<string>('')
const upperCaseCategoryName = computed(() => {
  return categoryName.value.toUpperCase()
})
fetchCategoryName()

async function fetchCategoryName() {
  const { data, error } = await supabase
    .from('categories')
    .select('name')
    .eq('id', props.categoryId)
    .single()
  console.log(data, props.categoryId, '/////')
  if (error) {
    console.error(error)
  } else {
    
    categoryName.value = data.name
    // categorySlug.value = data.slug ?? ''
  }
}
</script>