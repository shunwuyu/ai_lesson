import { useEffect } from "react"

const About = () => {
    useEffect(() => {
        document.title = "关于 - 宁浩网"
    })
    return <div>
        <h1>关于</h1>
        <div>旅梦创建于2015年</div>
    </div>
}

export default About