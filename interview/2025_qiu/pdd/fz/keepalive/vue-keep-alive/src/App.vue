<template>
  <div>
    <nav style="margin-bottom: 20px;">
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <!-- 缓存 Home 页面 -->
    <router-view v-slot="{ Component }">
      <KeepAlive include="Home">
        <component :is="Component" />
      </KeepAlive>
    </router-view>
  </div>
</template>

<script setup>
</script>
