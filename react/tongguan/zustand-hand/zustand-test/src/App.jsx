import React from 'react';
// 假设上面的代码保存在 store.js 文件中
import { create } from './zustand';

// 1. 创建 Store
// createState 接收 (set, get, api) 参数
const useCounterStore = create((set, get, api) => ({
  count: 0,
  text: '初始文本',
  // 定义一个动作方法（也可以直接在组件里调用 set，但封装在 store 里更清晰）
  increment: () => set((state) => ({ count: state.count + 1 })),
  updateText: (newText) => set({ text: newText }),
}));

// --- 子组件 A：只关心 count ---
// 当 text 变化时，这个组件【不会】重新渲染，因为 selector 返回的 count 没变
const CountDisplay = () => {
  console.log('CountDisplay 渲染了');
  
  // 选择器：只提取 count
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>计数器组件 (只订阅 count)</h3>
      <p>当前计数: {count}</p>
      <button onClick={increment}>增加 Count</button>
      <p style={{fontSize: '12px', color: '#666'}}>
        (尝试修改下方的 Text，此组件不会重新渲染)
      </p>
    </div>
  );
};

// --- 子组件 B：只关心 text ---
// 当 count 变化时，这个组件【不会】重新渲染
const TextDisplay = () => {
  console.log('TextDisplay 渲染了');

  // 选择器：只提取 text
  const text = useCounterStore((state) => state.text);
  const updateText = useCounterStore((state) => state.updateText);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h3>文本组件 (只订阅 text)</h3>
      <p>当前文本: {text}</p>
      <input 
        value={text} 
        onChange={(e) => updateText(e.target.value)} 
        placeholder="输入新文本"
      />
       <p style={{fontSize: '12px', color: '#666'}}>
        (尝试点击上方的 Count，此组件不会重新渲染)
      </p>
    </div>
  );
};

// --- 子组件 C：演示直接调用 API (不通过 Hook) ---
const ApiDemo = () => {
  const handleDirectUpdate = () => {
    // 直接通过挂载在 Hook 上的 API 修改状态
    // 这证明了 Object.assign(useBoundStore, api) 生效了
    useCounterStore.setState((prev) => ({ 
      count: prev.count + 10, 
      text: '通过 API 直接批量修改!' 
    }));
    
    // 也可以直接读取最新状态（不触发渲染）
    console.log('当前最新状态:', useCounterStore.getState());
  };

  return (
    <div style={{ border: '1px dashed red', padding: '10px', margin: '10px' }}>
      <h3>API 直接调用演示</h3>
      <button onClick={handleDirectUpdate}>
        点击直接调用 setState (Count+10 & 改文本)
      </button>
    </div>
  );
};

// --- 主组件 App ---
export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Zustand 简易版实现演示</h1>
      <p>打开浏览器控制台 (Console) 观察 "xxx 渲染了" 的日志，验证局部更新。</p>
      
      <div style={{ display: 'flex' }}>
        <CountDisplay />
        <TextDisplay />
      </div>
      
      <ApiDemo />
    </div>
  );
}