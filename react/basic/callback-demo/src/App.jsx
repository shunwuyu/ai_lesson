import { useState, useCallback, useEffect, useMemo } from 'react'
import './App.css'
import Repositories from './Repositories'

// function App() {
//   const [count, setCount] = useState(0)
//   const callback =() =>  {

//   }

//   return (
//     <>
//       {count}
//       <button onClick={() => setCount(count + 1)}>add</button>
//       <Repositories callback={callback} />
//     </>
//   )
// }


// function App() {
//   const [username, setUsername] = useState('shunwuyu');
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // 获取仓库数据
//   const fetchRepos = () => {
//     setLoading(true);
//     fetch(`https://api.github.com/users/${username}/repos`)
//       .then(res => res.json())
//       .then(data => {
//         setRepos(data);
//         setLoading(false);
//       });
//   };

//   // 使用 useCallback 缓存 refresh 函数
//   const refresh = useCallback(() => {
//     console.log('refresh 被调用');
//     fetchRepos();
//   }, [username]); // 只有 username 改变时才创建新的 refresh 函数

//   useEffect(() => {
//     fetchRepos();
//   }, []);

//   const handleInputChange = (e) => {
//     setUsername(e.target.value);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>GitHub 仓库查看器</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={handleInputChange}
//         placeholder="输入 GitHub 用户名"
//       />
//       {loading ? <p>加载中...</p> : null}
//       <Repositories repos={repos} onRefresh={refresh} />
//     </div>
//   );
// }

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const expensiveResult = useMemo(() => {
    console.log('Running expensive calc...');
    const bigArray = Array.from({ length: 100000 }, (_, i) => i).reverse();
    return bigArray.sort((a, b) => a - b)[0];
  }, [count]); // 仅当 count 变化时重新计算
  
  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>+1</button>
      <p>Count: {count}</p>
      <p>Result: {expensiveResult}</p>
    </div>
  );
}

function App() {
  return (
    <ExpensiveComponent />
  )
}

export default App
