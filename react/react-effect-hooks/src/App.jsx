import { useState, useEffect } from 'react'
import { useDelay } from './hooks/useDelay'
import { useFetch } from './hooks/useFetch'
function App() {
  // 延时2秒  返回一个响应式对象
  const isDone = useDelay(2000) 
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [fullname, setFullname] = useState('')
  const {
    data,
    error,
    isLoading
  } = useFetch('https://jsonplaceholder.typicode.com/users')

  useEffect(() => {
    console.log('一笑绝杀');
  }, [])
  useEffect(() => {
    console.log('//////')
    setFullname(`${firstname} ${lastname}`)
  }, [firstname])
  return (
    <>
      {isDone?(
        <p>Welcome to UseEffect</p>
      ):(
        <p>Page is loading....</p>
      )}
      <form>
        <div>
          <label htmlFor="firstnameInput">Firstname</label>
          <input 
            id="firstnameInput" 
            type="text" 
            value={firstname} 
            onChange={(e)=>setFirstname(e.target.value)}
            placeholder='请输入firstname'
          />
        </div>
        <div>
          <label htmlFor="lastnameInput">lastname</label>
          <input 
            id="lastnameInput" 
            type="text" 
            value={lastname} 
            onChange={(e)=>setLastname(e.target.value)}
            placeholder='请输入lastname'
          />
        </div>
        <div>全名 {fullname}</div>
      </form>
      {
        isLoading?(<div>加载中</div>):
        error?(
          <p>Error:{error.message}</p>
        ):
        (
          <ul>
            {
              data.map(item=>(
                <li key={item.id}>{item.name}</li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}

export default App
