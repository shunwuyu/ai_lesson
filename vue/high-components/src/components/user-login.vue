<template>
    <div>登录用户 {{username}}</div>
    <AppInput v-model="username" />
    <!-- 相当于 :modle-value="username" @update:model-value="usrname=$event"-->
</template>
<script >
import AppInput from './app-input.vue'
export default {
    data() {
        return {
            username: ''
        }
    },
    components: {
        AppInput
    },
    beforeCreate() {
        console.log('创建之前');
    },
    created() {
        console.log('已创建');
    },
    beforeMount() {
        console.log('挂载之前');
    },
    mounted() {
        console.log('已挂载');
    },
    beforeUpdate() {
        console.log('更新之前');
    },
    updated() {
        console.log('已更新');
    },
    unmounted() {
        console.log('已卸载');
    }
}
</script>