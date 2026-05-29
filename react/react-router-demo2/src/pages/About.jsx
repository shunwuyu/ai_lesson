import { useEffect } from "react"
import { Link } from 'react-router-dom'

const About = () => {
    useEffect(() => {
        document.title = "关于 - 宁浩网"
    })
    return <div>
        <h1>关于</h1>
        <div>旅梦创建于2015年</div>
        {/* <a href="/">回到首页</a> */}
        <Link to="/">回到首页</Link>
    </div>
}

export default About