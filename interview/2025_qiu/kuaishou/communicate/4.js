<template>
  <p>全局状态 count: {{ store.count }}</p>
</template>

<script>
import { useStore } from './store';
export default {
  setup() {
    const store = useStore();
    return { store };
  }
};
</script>


<template>
  <button @click="increment">增加</button>
</template>

<script>
import { useStore } from './store';
export default {
  setup() {
    const store = useStore();
    const increment = () => store.increment();
    return { increment };
  }
};
</script>

import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++; }
  }
});


import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

// 创建 Vue 应用实例
const app = createApp(App);

// 创建 Pinia 实例
const pinia = createPinia();

// 注册 Pinia
app.use(pinia);

// 挂载应用
app.mount('#app');



