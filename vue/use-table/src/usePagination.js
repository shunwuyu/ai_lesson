import { reactive } from "vue";
export function usePagination(
  cb,
  sizeOption = [10, 20, 50, 100, 200]
) {
  const pagination = reactive({
    current: 1,
    total: 0,
    sizeOption,
    size: sizeOption[0],
    // 维护page和size（一般是主动触发）
    onPageChange: (page) => {
      pagination.current = page;
      return cb();
    },
    onSizeChange: (size) => {
      pagination.current = 1;
      pagination.size = size;
      return cb();
    },
    // 一般调用cb后会还会修改total（一般是被动触发）
    setTotal: (total) => {
      pagination.total = total;
    },
    reset() {
      pagination.current = 1;
      pagination.total = 0;
      pagination.size = pagination.sizeOption[0];
    },
  });

  return [
    pagination,
    pagination.onPageChange,
    pagination.onSizeChange,
    pagination.setTotal,
  ];
}