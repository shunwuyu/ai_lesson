import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as chart from './components/chart'

createApp(App)
    .use(chart)
    .mount('#app')
