// /dashboard/about/page.js
// React 的新 API，让组件直接"消费"一个 Promise 结果，不需要 await ，和 Suspense 搭配用，数据到了就渲染。
import { use } from 'react'

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  return {
    message: 'Hello, About!',
  }
}

export default function Page() {
  const {message} = use(getData())
  return <h1>{message}</h1>
}
