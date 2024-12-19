<template>
  <div class="github-repos">
    <h2>GitHub Repositories</h2>
    <!-- 加载状态显示 -->
    <p v-if="loading">Loading...</p>
    <!-- 错误信息显示 -->
    <p v-if="error">{{ error }}</p>
    <!-- 仓库列表 -->
    <ul v-if="!loading && repos.length > 0">
      <li v-for="(repo, index) in repos" :key="index">
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        <span>({{ repo.stargazers_count }} stars)</span>
      </li>
    </ul>
    <!-- 当没有找到仓库时的提示 -->
    <p v-if="!loading && repos.length === 0">No repositories found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式数据
const repos = ref([]);
const loading = ref(true);
const error = ref(null);

// 方法：获取仓库列表
const fetchRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/vuejs/repos');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    repos.value = data;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// 组件挂载后获取仓库列表
onMounted(fetchRepos);
</script>

<style scoped>
/* 添加一些简单的样式 */
.github-repos {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}

a {
  text-decoration: none;
  color: #007bff;
}

a:hover {
  text-decoration: underline;
}
</style>