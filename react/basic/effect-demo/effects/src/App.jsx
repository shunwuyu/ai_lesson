import { 
  useState, 
  useEffect
} from 'react'
import './App.css'

// Timer 组件
function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
      console.log('//////');
    }, 1000);

    // 清理定时器
    // return () => clearInterval(timer);
  }, []); // 空数组表示只在组件挂载和卸载时执行一次

  return <div>已运行时间: {time} 秒</div>;
}
// 多个 useEffect
function Example() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('count changed:', count);
  }, [count]);

  useEffect(() => {
    console.log('name changed:', name);
  }, [name]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <p>Name: {name}</p>
      <button onClick={() => setName('John')}>Change Name</button>
    </div>
  );
}
// 依赖对象或数组
function Example2() {
  const [user, setUser] = useState({ name: 'Alice', age: 19 });

  useEffect(() => {
    console.log('User changed:', user);
  }, [user]); // 每当 user 对象发生变化时，副作用执行

  return (
    <div>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <button onClick={() => setUser({ ...user, name: 'kugo' })}>Change User</button>
    </div>
  );
}
// 副作用 请求接口
function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/shunwuyu/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repos');
        }
        const data = await response.json();
        setRepos(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []); // 空依赖数组，表示只在组件挂载时执行一次

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>GitHub Repositories</h2>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  // mounted
  useEffect(() => {
    
    console.log('组件渲染完成');
  });
  // 带依赖数组的 useEffect
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]);


  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* 切换按钮 */}
      <button onClick={() => setIsTimerOn(!isTimerOn)}>
        {isTimerOn ? '关闭计时器' : '开启计时器'}
      </button>

      {/* 条件渲染 Timer 组件 */}
      {isTimerOn && <Timer />}
      <Example/>
      <Example2 />
      <GitHubRepos />
    </>
  )
}

export default App
