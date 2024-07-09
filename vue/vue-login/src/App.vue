<script setup>
</script>

<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <router-link to="/" class="hover:text-gray-300">首页</router-link> 
    <router-link to="/cart" class="hover:text-gray-300">购物车</router-link>
    <router-link to="/login" class="hover:text-gray-300">登录</router-link>
  </nav>
  <div class="flex">
    
  </div>
  <div>
    <router-view />
  </div>
  
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
