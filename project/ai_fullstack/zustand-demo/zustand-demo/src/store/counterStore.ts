// counterStore.ts
import { create } from 'zustand';
// 从 Zustand 状态管理库中导入持久化中间件，可将 store 的状态自动保存到 localStorage
import { persist } from 'zustand/middleware';
// CounterState 接口 里有哪些数据和方法， 合同。
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}
// CounterState 泛型参数，用于指定 store 的状态类型
const useCounterStore = create<CounterState>(
  persist(
    // set 函数，用于更新 store 的状态
    (set) => ({
      count: 0,// 初始状态为 0
      increment: () => set((state: CounterState) => ({ count: state.count + 1 })),
      decrement: () => set((state: CounterState) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // Unique name for the storage key
    }
  ) as any // 类型断言，将 store 转换为 any 类型，以避免类型检查错误
);

export default useCounterStore;
