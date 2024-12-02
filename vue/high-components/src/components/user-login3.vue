<template>
    <div>登录用户</div>
    <input type="text" ref="username">
    <input type="text">
</template>
<script setup>
import { ref, onMounted } from 'vue'
const username = ref(null)
onMounted(() => {
    console.log(username.value, '////')
    //username.value.focus()
})
</script>