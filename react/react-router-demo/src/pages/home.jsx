import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    useEffect(() => {
        document.title = '旅梦'
    })
    const navigate = useNavigate()
    
    return <div>
        <h1>首页</h1>
        <div>欢迎在掘金学习React。</div>
        <div onClick={() => {
            navigate('/posts')
        }}>
            浏览内容
        </div>
    </div>
}

export default Home;