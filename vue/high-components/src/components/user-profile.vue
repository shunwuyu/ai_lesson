<template>
    <div>UserProfile</div>
    <component :is="currentComponent"></component>
    <small @click="onClickHintText">{{ hintText }}</small>
</template>
<script setup>
import { shallowRef, ref  } from 'vue'
import UserLogin from './user-login.vue'
import UserRegister from './user-register.vue'

const hintText = ref('还没有账户，点击注册')
//shallowRef 创建一个响应式引用，但它仅在其最外层的值上创建响应性，而不会深入到对象的内部属性。
const currentComponent = shallowRef(UserLogin)

const onClickHintText = () => {
    
    if (currentComponent.value == UserRegister) {
        currentComponent.value = UserLogin
        hintText.value = '还没有账户，点击注册'
    } else {
        currentComponent.value = UserRegister
        hintText.value = '已有账户，点击登录'
    }
}

</script>