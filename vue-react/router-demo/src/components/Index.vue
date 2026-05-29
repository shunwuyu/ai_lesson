<template>
  <div @click="onClickText">你好，欢迎访问宁皓网！</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function onClickText() {  
  router.push('/about')
}

</script>