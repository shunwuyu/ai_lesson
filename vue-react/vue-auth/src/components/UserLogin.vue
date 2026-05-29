<template>
  <div>
    <input type="text" placeholder="用户名" v-model="name" />
    <input type="password" placeholder="密码" v-model="password" />
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { apiHttpClient } from '@/utils/app.service';

const emit = defineEmits(['login-success', 'login-error']);

const name = ref("")
const password = ref("")
const login = async () => {
  // console.log(name.value, password.value);
  console.log(apiHttpClient)
  try {
    const response = await apiHttpClient.get('/login', {
          name:name.value,
          password:password.value
    });
    // console.log(response)
    emit('login-success', response.data)
  } catch(err) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>