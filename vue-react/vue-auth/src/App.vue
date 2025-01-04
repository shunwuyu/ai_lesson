<script setup>
import { ref, computed, onMounted } from "vue";
import UserLogin from "./components/UserLogin.vue";
import { apiHttpClient } from '@/utils/app.service';

const name = "宁浩网"

const token = ref("")
const currentUser = ref({})
const errorMessage = ref("")
// 将表达式强制转换为布尔值的操作符
// const isLoggedIn = computed(() => token.value ? true : false);
const isLoggedIn = computed(() => !!token.value)
const onLoginSuccess = (data) => {
  token.value = data.token;
  getCurrentUser(data.id);
  
  localStorage.setItem('tid', data.token);
  localStorage.setItem('uid', data.id);
}
const getCurrentUser = async (userId) => {
  try {
    const response = await apiHttpClient.get(`/users/${userId}`);

    currentUser.value = response.data;
  } catch (error) {
    errorMessage.value = error.message;
  }
}

const onLoginError = (error) => {
  errorMessage.value = error.data.message;
}

const logout = () => {
  token.value = ''
  currentUser.value = ''
  localStorage.removeItem('tid');
  localStorage.removeItem('uid');
}

onMounted(() => {
  const tid = localStorage.getItem('tid');
  const uid = localStorage.getItem('uid');

  if (tid) {
    token.value = tid;
  }

  if (uid) {
    getCurrentUser(uid);
  }

  getPosts();
})

const posts = ref([])
const getPosts = async () => {
  try {
    const response = await apiHttpClient.get('/posts');
    posts.value = response.data;
  } catch (error) {
        errorMessage.value = error.message;
    }
}
</script>

<template>
  <div>
  <h3>{{ name }}</h3>
    <UserLogin
      v-if="!isLoggedIn"
      @login-success="onLoginSuccess"
      @login-error="onLoginError"
    />
    <div v-if="currentUser">
      <div>{{ currentUser.name }}</div>
      <button @click="logout">退出</button>
    </div>
    <div v-for="post in posts" :key="post.id">
      {{ post.title }} -
      <small>{{ post.user.name }}</small>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
