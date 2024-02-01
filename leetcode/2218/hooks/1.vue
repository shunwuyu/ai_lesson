<!-- SearchHistory.vue -->
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
  import useLocalStorage from './useLocalStorage';
  
  export default {
    setup() {
      const { state: searchHistory, add: addToHistory } = useLocalStorage(
        'searchHistory',
        []
      );
      const searchTerm = ref('');
  
      function addSearchToHistory() {
        if (searchTerm.value && !searchHistory.includes(searchTerm.value)) {
          addToHistory([searchTerm.value, ...searchHistory]);
          searchTerm.value = '';
        }
      }
  
      return {
        searchTerm,
        addSearchToHistory,
        searchHistory: computed(() => searchHistory),
      };
    },
  };
  </script>