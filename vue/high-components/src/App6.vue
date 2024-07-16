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
        @tap="onTapAppButton"
        @init="onInitAppButton"
    >
    确定
    </AppButton>
</template>

<style scoped>

</style>    