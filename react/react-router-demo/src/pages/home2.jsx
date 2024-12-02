import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        document.title = '旅梦'
    })
    return <div>
        <h1>首页</h1>
        <div>欢迎在宁浩网学习React。</div>
    </div>
}

export default Home;