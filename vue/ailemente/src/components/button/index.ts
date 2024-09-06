import type {App} from 'vue'
import ElButton from './Button.vue'

export default {
  install(app:App){
    app.component(ElButton.name,ElButton)
  }
}