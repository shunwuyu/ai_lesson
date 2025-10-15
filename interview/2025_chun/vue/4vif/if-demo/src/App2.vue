<template>
  <div>
    <button @click="showLogin = true">登录</button>

    <!-- 登录弹窗 -->
    <div v-if="showLogin" class="modal">
      <h2>用户登录</h2>
      <input placeholder="用户名" />
      <input placeholder="密码" type="password" />
      <button @click="login">提交</button>
      <button @click="showLogin = false">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showLogin = ref(false)

function login() {
  alert('登录中...')
  showLogin.value = false
}
</script>

<style>
.modal {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  padding: 16px;
}
</style>
