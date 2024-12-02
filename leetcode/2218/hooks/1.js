// useLocalStorage.js
import { ref, onMounted } from 'vue';

export default function useLocalStorage(key, initialValue) {
  const state = ref(initialValue);

  const loadFromStorage = () => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      state.value = JSON.parse(storedValue);
    }
  };

  const saveToStorage = value => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  onMounted(loadFromStorage);

  return {
    state,
    loadFromStorage,
    saveToStorage,
  };
}