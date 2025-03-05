<template>
  <div>
    {{msg2}}
  </div>
</template>

<script setup>
const props = defineProps({
        // 写法一
        msg2: String
        // 写法二
        // msg2:{
        //     type:String,
        //     default:""
        // }
    })
    console.log(props)

</script>

<style scoped>

</style>