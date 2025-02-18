<template>
  <div id="app">
    <router-link to="/">首页</router-link>
    <router-link to="/page-a">页面 A</router-link>
    <router-link to="/page-b">页面 B</router-link>

    <hr />

    <!-- 使用 KeepAlive 来缓存首页组件 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}

hr {
  margin: 20px 0;
}
</style>