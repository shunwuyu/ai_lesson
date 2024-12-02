import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const PostIndex = () => {
    useEffect(() => {
        document.title="内容 - 旅梦"
    })
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <div>
            <h1>PostIndex</h1>
            <div>
                <div>
                    <strong>
                        search:
                    </strong>
                    { searchParams.get('search')}
                </div>
                <input type="text" onChange={({currentTarget: {value}}) =>{ 
                    if (value) {
                        setSearchParams({ search: value})
                    } else {
                        setSearchParams({})
                    }
                 }}/>
            </div>
        </div>
    )
}

export default PostIndex