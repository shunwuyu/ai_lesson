<template>
  <div>
    <input v-model="searchTerm" @keyup.enter="addSearchToHistory">
    <ul>
      <li v-for="(historyItem, index) in searchHistory" :key="index">
        {{ historyItem }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const searchTerm = ref('');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

    function addSearchToHistory() {
      if (searchTerm.value && !searchHistory.includes(searchTerm.value)) {
        searchHistory.unshift(searchTerm.value);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
      }
      searchTerm.value = '';
    }

    onMounted(() => {
      // 初始化时从 localStorage 加载搜索历史
      searchTerm.value = searchHistory[0] || '';
    });

    return {
      searchTerm,
      addSearchToHistory,
      searchHistory: computed(() => searchHistory),
    };
  },
};
</script>