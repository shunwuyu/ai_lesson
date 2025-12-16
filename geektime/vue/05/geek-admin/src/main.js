import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 加载 router 的配置
import router from './router/index'
createApp(App)
  .use(router)
  .mount('#app')
