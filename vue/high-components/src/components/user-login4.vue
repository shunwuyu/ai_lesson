<template>
    <div>登录用户 {{username}}</div>
    <AppInput v-model="username" />
    <!-- 相当于 :modle-value="username" @update:model-value="usrname=$event"-->
</template>
<script setup>
import { ref } from 'vue'
import AppInput from './app-input.vue'

const username = ref(null)

</script>