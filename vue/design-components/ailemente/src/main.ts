import { createApp } from 'vue'
import './style.css'
// import App from "./App.vue"
import App from './App.vue'
import ElContainer from './components/container'
import ElDialog from './components/dialog'

const app = createApp(App)
app
    .use(ElContainer)
    .use(ElDialog)
    .mount('#app')
// console.log('ddd')