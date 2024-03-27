import {usePagination} from './usePagination'
export function useTable(api) {
  const [pagination, , , setTotal] = usePagination(() => refresh());
  const data = ref([]);

  const refresh = () => {
    return api({ page: pagination.current, limit: pagination.size }).then(
      (res) => {
        data.value = res.data;
        setTotal(res.total);
      }
    );
  };
  return [data, refresh, pagination];
}