// composables/useRequest.js
import { ref, watchEffect } from 'vue';

/**
 * 自定义 useRequest 函数
 * @param {Function} requestFn - 异步请求函数
 * @returns {{data: Ref, loading: Ref, error: Ref}}
 */
export function useRequest(requestFn:() => void) {
  const data = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const fetchData = async () => {
    try {
      const response = await requestFn();
      data.value = response.data;
      error.value = null;
    } catch (err) {
      error.value = err;
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  // 使用 watchEffect 立即执行 fetchData 并在依赖变化时重新执行
  watchEffect(fetchData);

  return { data, loading, error };
}