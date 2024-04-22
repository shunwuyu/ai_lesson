import { createApp } from 'vue'
import './app.scss'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import TaroStorage from "./store/taroStorage";
import Taro from "@tarojs/taro";
import {useUserStore} from "./store/user";


const App = createApp({
  onShow (options) {},
  mounted () {
    const userStore =  useUserStore()
    Taro.checkSession({}).then(res => {
      console.log(res)
    }).catch(err => {
        console.error("用户身份过期" + err)
        userStore.logout()
    })
    },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

const pinia = createPinia()
pinia.use(
    createPersistedState({
        storage: new TaroStorage(),
    })
)
App.use(pinia)

export default App
