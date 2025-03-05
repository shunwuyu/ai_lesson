<template>
  <div>
    ParentOne
    <ChildOne :msg1="msg1" :msg2="msg2" />
  </div>
</template>
<script>
// setup 写法
import ChildOne from "./ChildOne.vue"
import { ref, reactive } from "vue"
export default {
    data(){
        return {
            msg1:"这是传级子组件的信息1"
        }
    },
    setup(){
        // 创建一个响应式数据
        
        // 写法一 适用于基础类型  ref 还有其他用处，下面章节有介绍
        const msg2 = ref("这是传级子组件的信息2")
        
        // 写法二 适用于复杂类型，如数组、对象
        // const msg2 = reactive(["这是传级子组件的信息2"])
        
        return {
            msg2
        }
    },
    components:{
        ChildOne
    }
}
</script>