// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import lazyLoad from './directives/lazy'

const app = createApp(App)

// 注册全局指令
app.directive('lazy', lazyLoad)

app.mount('#app')