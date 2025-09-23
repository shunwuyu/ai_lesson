import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router'; // 需自行配置路由（如下）
// 引入Mock（开发环境）

const app = createApp(App);

app.use(createPinia())
  .use(ElementPlus)
  .use(router)
  .mount('#app');