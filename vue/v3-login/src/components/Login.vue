<template>
  <div class="login"
  :class="{ login__signin: isSignIn, login__signup: isSignUp }">
  <!-- native 修饰符表示这个事件监听器会直接监听组件的根元素上的原生事件，而不是监听组件内部通过 $emit 发出的自定义事件。   -->
    <login-tabs @click.native="switchState" />
    <login-form />
  </div>
</template>

<script setup>
import LoginTabs from './LoginTabs.vue'
import LoginForm from './LoginForm.vue'
import { ref, computed } from 'vue'
const state = ref(1)

const isSignIn = computed(() => state.value === 1)
const isSignUp = computed(() => state.value === 2)

const switchState = () => {
  state.value = state.value === 1 ? 2 : 1
} 
</script>

<style  scoped>
.login {
  width: 100%;
  color: white;
  font-size: 14px;
}
</style>