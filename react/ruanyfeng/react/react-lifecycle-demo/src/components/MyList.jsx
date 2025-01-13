import { useEffect, useState } from 'react';
const MyList = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])

  const [count, setCount] = useState(0);
  // 当你不提供依赖项数组时，useEffect 的回调函数会在每次组件渲染后都执行。这意味着每当组件的状态或属性发生变化并导致重新渲染时，useEffect 的副作用都会被触发。
  useEffect(() => {
    console.log('hiiiiiii')
  })
  useEffect(() => {
    console.log('Component did mount');
    return () => console.log('Cleanup on unmount');
  }, []); // 只在挂载和卸载时运行

  useEffect(() => {
    console.log(`Count changed to ${count}`);
  }, [count]); // 只在 count 改变时运行

  useEffect(() => {
    const url = 'https://api.github.com/search/repositories?q=javascript&sort=stars';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        setError(null)
        setData(data.items)
      })
  }, [])
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      <ul>
        {data.length && data.map(item => <li key={item.id}>
          <a href={item.html_url}>{item.name}</a>
        </li>)}
      </ul>
    </div>
  )
}


export default MyList