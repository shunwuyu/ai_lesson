import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/'
import './assets/css/main.css'

const app = createApp(App)
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app
    .use(router)
    .use(ElementPlus)
    .mount('#app')
