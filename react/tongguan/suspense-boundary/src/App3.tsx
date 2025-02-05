import { Suspense } from 'react'
// atom 函数用于创建一个原子（atom），原子是 Jotai 状态管理库中的基本单位，
// 它代表一个可以被订阅和更新的状态。在这个例子中，userAtom 是一个异步原子，
// 它通过 fetch 请求获取用户数据，并将其作为状态存储。
import { atom, useAtom } from 'jotai'

const userAtom = atom(async (get) => {
  const userId = 1;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`
  )
  return response.json()
})

const UserName = () => {
  const [user] = useAtom(userAtom)
  return <div>User name: {user.name}</div>
}

export default function App() {
  return <Suspense fallback="Loading...">
    <UserName />
  </Suspense>
}
