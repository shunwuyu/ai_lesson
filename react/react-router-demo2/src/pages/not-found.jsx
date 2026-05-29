import { useEffect } from "react"

const NotFound = () => {
    useEffect(() => {
        document.title = "404"
    })
    return (
        <div>
            <h1>404</h1>
        </div>
    )
}

export default NotFound