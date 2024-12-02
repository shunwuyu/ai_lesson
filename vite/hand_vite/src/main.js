import { createApp } from 'vue' // node_module
import App from './App.vue' // 解析成额外的 ?type=template请求 
import './index.css'

createApp(App).mount('#app')