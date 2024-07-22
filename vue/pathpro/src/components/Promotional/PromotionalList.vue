<template>
  <div class="list-wrapper flex flex-wrap items-center">
    <div class="item flex-[0_0_50%]" v-for="(item, index) in items" :key="item.id">
      <PromotionalCard :item="item" :ref="(el) => (index === items.length - 1 ? (itemRef = el as HTMLElement) : '')" />
    </div>
  </div>
  <div class="text-center" v-if="!hasMore">没有更多了</div>
</template>

<script setup lang="ts">
import type { PromotionalItem } from "@/types/promotional"
import PromotionalCard from "./PromotionalCard.vue"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { ref } from "vue"

defineOptions({
  inheritAttrs: false,
})

const itemRef = ref<HTMLElement | null>(null)

const props = defineProps<{
  items: PromotionalItem[]
  /** 获取下一页的方法 */
  next?: (setHasMore: (value: boolean) => void) => void
}>()

const { hasMore, setHasMore } = useIntersectionObserver(itemRef, () => {
  // console.log("触发了")
  props.next?.(setHasMore)
})
</script>

<style scoped></style>