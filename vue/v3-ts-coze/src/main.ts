import { createApp } from 'vue'
import '@/assets/tailwind.css'
import '@/assets/reset.css'
import 'lib-flexible/flexible.js'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
