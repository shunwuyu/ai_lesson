<template>
  <div class="item-wrapper flex space-x-2 w-screen overflow-scroll px-4">
    <div
      class="item flex-[0_0_auto] w-28 space-y-2"
      v-for="(item, index) in items"
      :key="item.title"
      :ref="(el) => (index === items.length - 1 ? (NodeRef = el as HTMLDivElement) : '')"
    >
      <div class="item-image">
        <img :src="item.cover" alt="item.name" class="rounded-lg" />
      </div>
      <div class="item-info">
        <div class="item-name text-xs font-bold">{{ item.title }}</div>
        <div class="item-price text-xs font-bold">{{ item.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { RecentlyViewItem } from "@/types/home"
import { getCurrency } from "@/utils/utils"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const NodeRef = ref<HTMLDivElement | null>(null)

const { hasMore } = useIntersectionObserver(NodeRef, () => {
  console.log("hasMore", hasMore.value)
})

defineProps<{
  items: RecentlyViewItem[]
}>()
</script>

<style scoped></style>