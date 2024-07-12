import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import { ElBadge } from './components/Badge'

console.log(ElBadge)

createApp(App)
    .use(ElBadge)
    .mount('#app')
