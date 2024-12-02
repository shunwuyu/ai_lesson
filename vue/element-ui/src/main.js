import { createApp } from 'vue'
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/'
import './assets/css/main.css'
import './assets/css/icon.css';
import { usePermissStore } from './store/permiss';

const app = createApp(App)
// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app
    .use(router)
    .use(ElementPlus)
    .use(createPinia())

const permiss = usePermissStore();
app.directive('permiss', {
    mounted(el, binding) {
        if (binding.value && !permiss.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    },
});
app
    .mount('#app')
