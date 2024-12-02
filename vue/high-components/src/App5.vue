<script setup>
import AppButton from './components/app-button.vue'

const onTapAppButton = (text) => {
    console.log('onTapAppButton', text)
}
function onInitAppButton() {
    console.log('onInitAppButton')
}
</script>

<template>
  <!--PascalCase-->
  <!--|||||-->
    <AppButton 
        text="确定" 
        @tap="onTapAppButton"
        @init="onInitAppButton"
    >
    </AppButton>
</template>

<style scoped>

</style>    