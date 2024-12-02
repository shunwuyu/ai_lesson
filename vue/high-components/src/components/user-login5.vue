<template>
    <div>登录用户 {{username}}</div>
    <AppInput v-model="username" />
    <!-- 相当于 :modle-value="username" @update:model-value="usrname=$event"-->
</template>
<script setup>
import { ref, onBeforeMount, onMounted, onUpdated, onUnmounted } from 'vue'
import AppInput from './app-input.vue'

const username = ref(null)

onBeforeMount(() => {
    console.log('user login created');
})

onMounted(() => {
    console.log('user login mounted');
})

onUpdated(() => {
    console.log('user login updated');
})

onUnmounted(() => {
    console.log('user login unmounted');
})
</script>