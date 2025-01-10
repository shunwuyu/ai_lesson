import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'


createApp(App)
  .use(router)
  .use(Element3)
  .mount('#app')
