<template>
  <div class="page">
    <div class="page-header">
      <h3 class="brand">{{ name }}</h3>
      <div class="menu">
        <router-link class="menu-item" to="/">首页</router-link>
        <router-link class="menu-item" :to="{ name: 'about' }"
          >关于</router-link
        >
        <router-link class="menu-item" :to="{ name: 'postIndex' }"
          >内容</router-link
        >
      </div>
    </div>
    <div class="page-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
const name = '宁皓网';
</script>

<style>
input[type='text'],
textarea,
select {
  padding: 4px 8px;
  margin: 8px 0;
  margin-right: 8px;
  font-size: 16px;
}

label {
  margin-left: 4px;
}

.page {
  padding: 32px;
}

.page-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
}

.brand {
  margin-right: 32px;
}

.menu-item {
  display: inline-block;
  text-decoration: none;
  color: #585858;
  margin: 8px;
  padding: 8px 16px;
}

.page-body {
  margin: 24px 0;
}

.router-link-active {
  color: #505050;
  background: #eeeeee;
  border-radius: 5px;
}
</style>