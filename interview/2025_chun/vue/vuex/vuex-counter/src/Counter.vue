<template>
  <div id="app">
    Clicked: {{ count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 不用 computed 没有依赖 计算属性自动缓存 并依赖
const count =  computed(() => store.state.count)
const evenOrOdd =  computed(() => store.getters.evenOrOdd)
const increment =  () => store.dispatch('increment')
const decrement =  () => store.dispatch('decrement')
const incrementIfOdd = () => store.dispatch('incrementIfOdd')
const incrementAsync =  () => store.dispatch('incrementAsync')
</script>

<style scoped>

</style>