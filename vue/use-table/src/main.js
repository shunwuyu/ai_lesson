import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ElTable, ElTableColumn, ElPagination }  from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElPagination)
    .mount('#app')
