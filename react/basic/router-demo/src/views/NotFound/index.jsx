import { 
    useNavigate, 
    // useEffect
} from 'react-router-dom';
import {
    useEffect
} from 'react'

const NotFound = () => {
    let navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }, [])
    return (
        <>
            NotFound
        </>
    )
}

export default NotFound