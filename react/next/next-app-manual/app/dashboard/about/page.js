// /dashboard/about/page.js
// use 是一个新的 React hook，用于处理 Promise、Context 和其他可订阅的值。
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
