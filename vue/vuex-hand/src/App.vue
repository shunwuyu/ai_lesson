<script setup>
import { computed } from 'vue'
// import {useStore} from 'vuex'
import { useStore } from './store/gvuex'
let store = useStore()
let count = computed(() => store.state.count)
let double = computed(() => store.getters.double)

function asyncAdd() {
    store.dispatch('asyncAdd')
}
function add() {
    // count.value+=1
    store.commit('add')
}
</script>

<template>
  <div>{{ count }} *2 = {{ double }}</div>
  <button @click="add">add</button>
  <button @click="asyncAdd">async add</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
