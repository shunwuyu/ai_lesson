import { create } from 'zustand'
import { useEffect } from 'react'

// 用 create 函数创建一个 store，定义 state 和修改 state 的方法。
const useXxxStore = create((set) => ({
  aaa: '',
  bbb: '',
  updateAaa: (value) => set(() => ({ aaa: value })),
  updateBbb: (value) => set(() => ({ bbb: value })),
}))

export default function App() {
  // 调用 create 返回的函数，取出属性或者方法在组件里用
  const updateAaa = useXxxStore((state) => state.updateAaa)
  // console.log(updateAaa);
  const aaa = useXxxStore((state) => state.aaa)
  // console.log(aaa);

  useEffect(() => {
    // 订阅发布者模式
    // 订阅 store 的变化，当 store 发生变化时，调用回调函数
    useXxxStore.subscribe((state) => {
      console.log(useXxxStore.getState());
    })
  }, []);

  return (
    <div>
        <input
          onChange={(e) => updateAaa(e.currentTarget.value)}
          value={aaa}
        />
        <Bbb></Bbb>
    </div>
  )
}

function Bbb() {
  return <div>
    <Ccc></Ccc>
  </div>
}

function Ccc() {
  // 调用 create 返回的函数，取出属性或者方法在组件里用
  // 体现zustand 全局状态管理的特点 正确、共享、可追踪
  const aaa = useXxxStore((state) => state.aaa)
  return <p>hello, {aaa}</p>
}
