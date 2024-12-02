import { useState } from 'react'
import './app-hook.css'

type AppHookProps = {

}

const AppHook = (props: AppHookProps) => {
    // const state = useState('🦖')
    // console.log(state)
    
    
    // return (
    //     <div className="app-hook">
    //         AppHook
    //     </div>
    // )
    //  要废很多资源才能计算出来，我们可以使用 lazy 的方式设置这个初始值
    const [emoji, setEmoji] = useState(() => {
        console.log('----')
        return '🦖'
    })
    const onClickEmoji = () => {
        setEmoji(emoji === '🦖'? '🌲':'🦖')
    }

    const [quantity, setQuantity] = useState(5)

    // const onClickIncrease = () => {
    //     setQuantity(quantity + 1)
    // }

    const onClickIncrease = () => {
        setQuantity((preQuantity) => { 
            return preQuantity + 1 
        })
    }

    // const onClickDecrease = () => {
    //     setQuantity(quantity - 1)
    // }

    const onClickDecrease = () => {
        setQuantity((preQuantity) => { 
            return preQuantity - 1
        })
    }

    return (
        <div className="app-hook">
            <h1>{emoji} <br /> {quantity}</h1>
            <button onClick={onClickEmoji}>表情符号</button>
            <div>
                <button onClick={onClickIncrease}>+</button>
                <button onClick={onClickDecrease}>-</button>
            </div>
        </div>
    )
}

export default AppHook