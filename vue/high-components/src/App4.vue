<script setup>
import AppButton from './components/app-button.vue'
// ---
import AppDemoButton from './components/app-demo-button.vue'
</script>

<template>
  <!--PascalCase-->
  <!--|||||-->
  <AppButton text="确定"></AppButton>
  <AppButton />
  <!-- kebab-case kebab-case是字符串格式的一种,也称为短线连接命名法、短横线命名法、中横线命名法等-->
  <app-button></app-button>
  <app-button/>
  <AppDemoButton/>
</template>

<style scoped>

</style>
