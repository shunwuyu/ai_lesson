import {App} from 'vue'
import ElDialog from './Dialog.vue'

export default {
  install(app:App){
    app.component(ElDialog.name,ElDialog)
  }
}