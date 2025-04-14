<template>
    <component :is="activeComponentRef" v-if="activeComponentRef" />
  </template>
  
  <script setup>
  import { shallowRef, defineProps, watch, h, onBeforeUnmount } from 'vue'
  
  const props = defineProps({
    componentName: String,
    componentsMap: Object,
  })
  
  const cache = new Map()
  const activeComponentRef = shallowRef(null)
  
  watch(
    () => props.componentName,
    (newComp) => {
      if (cache.has(newComp)) {
        activeComponentRef.value = cache.get(newComp)
      } else {
        const comp = props.componentsMap[newComp]
        const vnode = h(comp)
        cache.set(newComp, vnode)
        activeComponentRef.value = vnode
      }
    },
    { immediate: true }
  )
  
  onBeforeUnmount(() => {
    cache.clear()
  })
  </script>
  