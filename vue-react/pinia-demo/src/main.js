// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

// 创建并使用 Pinia
const pinia = createPinia();
app.use(pinia);

app.mount('#app');