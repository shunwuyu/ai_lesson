// store.js
import { create } from 'zustand';

// create 是一个用于创建状态存储（state store）的函数。
// 它接受一个函数作为参数，这个函数定义了状态的初始值和如何更新状态。
// set 函数用于更新状态，它接受一个新的状态对象或一个函数，这个函数接受当前状态并返回一个新的状态对象。
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;
