// import { effect, reactive} from '@vue/reactivity'
import { effect, reactive} from './reactivity'

const obj = reactive({a:1})
// console.log('dddd')
effect(() => {
    console.log('/////')
    const val = obj.a
    console.log(val)
})
setInterval(() => {
    obj.a++
}, 1000)