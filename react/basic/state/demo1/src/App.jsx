import { useState, useEffect, useRef } from 'react'
import './App.css'

// function App() {
//   const [count, setCount] = useState(0)
//   const handleClick = () => {
//     // 因为 count 是闭包中的旧值（0），所以 setCount(count + 1) 
//     // 三次都变成了 setCount(1)。同步
//     // 合并了多次更新，只执行了一次。
//     // setCount(count + 1);
//     // console.log(count) // 异步
//     // setCount(count + 1);
//     // setCount(count + 1);
//     // 函数式更新语法 保证每个更新都基于上一个最新的值，
//     // 即使它们被合并成**一次**更新
//     setCount(prevCount => prevCount + 1);
//     setCount(prevCount => prevCount + 1);
//     setCount(prevCount => prevCount + 1);
//   };
//   return (
//     <>
//       <p>当前计数: {count}</p>
//       <button onClick={handleClick}>+3</button>
//     </>
//   )
// }

// 闭包陷阱
// function App() {
  // const [count, setCount] = useState(0);
  // const countRef = useRef(count);
  // useEffect(() => {
  //   // 0 闭包 React 不会自动更新闭包里的值。
  //   const timer = setTimeout(() => {
  //     console.log('在 setTimeout 中打印 count:', count);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []); // 空依赖数组：只执行一次
  // 每次 count 变化都重新注册 effect
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('最新 count:', count);
  //   }, 3000);
  
  //   return () => clearTimeout(timer);
  // }, [count]);

  // useEffect(() => {
  //   countRef.current = count;
  // }, [count]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('通过 ref 获取的最新 count:', countRef.current);
  //   }, 4000);

  //   return () => clearTimeout(timer);
  // }, []);

  // return (
  //   <div style={{ padding: '20px' }}>
  //     <h1>当前计数: {count}</h1>
  //     <button onClick={() => setCount(prev => prev + 1)}>增加计数</button>
  //   </div>
  // );
// }
// 状态合并 vs 替换

// function App() {
//   const [user, setUser] = useState({ name: 'Tom', age: 20 });

//   const updateUserInfo = () => {
//     // ❌ 错误写法：直接传入新对象，原对象会被**完全替换**
//     // setUser({ age: 21 }); // 这会导致 name 属性丢失！

//     // ✅ 正确写法：使用函数式更新，保留旧值并合并新属性
//     setUser(prev => ({ ...prev, age: 21 }));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>当前用户信息：</h2>
//       <pre>{JSON.stringify(user, null, 2)}</pre>

//       <button onClick={updateUserInfo}>更新年龄为 21</button>
//     </div>
//   );
// }

模拟一个耗时的计算函数
function heavyComputation() {
  console.log('开始执行 heavyComputation...');

  // 模拟大量计算
  const startTime = performance.now();

  const result = [];
  for (let i = 0; i < 10000; i++) {
    result.push({ id: i, name: `用户-${i}` });
  }

  const duration = performance.now() - startTime;
  console.log(`✅ 生成了 ${result.length} 条数据，耗时 ${duration.toFixed(2)}ms`);

  return result;
}

function App() {
  // ✅ 使用惰性初始化：只有第一次渲染时调用 heavyComputation
  const [users] = useState(() => heavyComputation());

  // ❌ 对比方式：每次组件更新都会执行 heavyComputation()
  // const [users] = useState(heavyComputation());

  const [filterText, setFilterText] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.includes(filterText)
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>用户列表</h2>
      <input
        type="text"
        placeholder="输入用户名过滤"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <p>当前显示 {filteredUsers.length} 个用户</p>

      <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// function App() {
//   const [arr, setArr] = useState([1, 2, 3]);
//   const handleClick = () => {
//     arr.push(4);
//     // React 判断的是 引用变化，直接修改原数组引用没变，React 不会重新渲染。
//     setArr(arr); // 不触发更新
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>添加元素</button>
//       <p>当前数组: {arr.join(', ')}</p>
//     </div>
//   );
// }

// function App() {
//   // 初始化的列表数据，每个 item 包含 id、text 和 isActive 状态
//   const initialItems = [
//     { id: 1, text: '苹果', isActive: false },
//     { id: 2, text: '香蕉', isActive: false },
//     { id: 3, text: '橙子', isActive: false },
//   ];

//   // 使用 useState 管理列表状态
//   const [items, setItems] = useState(initialItems);

//   // 切换指定 id 的 item 的激活状态
//   // 使用函数式更新确保拿到最新状态。
//   // 使用展开运算符 {...item} 创建新对象，保证不可变性。
//   const toggleActive = (id) => {
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, isActive: !item.isActive } : item
//       )
//     );
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>可切换激活状态的列表</h2>
//       <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
//         {items.map((item) => (
//           <li key={item.id}>
//             <button
//               onClick={() => toggleActive(item.id)}
//               style={{
//                 backgroundColor: item.isActive ? '#d1e7dd' : '#f8d7da',
//                 padding: '10px 20px',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               {item.text} - {item.isActive ? '已激活' : '未激活'}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

export default App
