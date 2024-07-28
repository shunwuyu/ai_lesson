import { useEffect } from "react"
import { useParams } from "react-router-dom"

const PostShow = () => {
    const { postId } = useParams()
    useEffect(() => {
        document.title = `内容${postId}`
    })
    return (
        <>
            PostShow
        </>
    )
}

export default PostShow