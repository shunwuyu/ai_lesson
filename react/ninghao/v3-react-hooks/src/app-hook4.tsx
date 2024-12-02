import { useState, useEffect     } from 'react'
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
    // 函数式的 React 组件在渲染以后可以使用 useEffect 这个 Hook
    //  安排执行一些动作，这些动作就是 effect，也就是效应
    // 每次更新都会执行
    // useEffect(() => {
    //     console.log('useEffect', emoji)
    // })
    // useEffect(() => {
    //     console.log('useEffect', emoji)
    //     // 更新， 卸载都会执行
    //     return () => {
    //         console.log('useEffect, 清理effect')
    //     }
    // })
    // 添加了依赖， 只有在emoji 发生变化后才会去执行
    

    useEffect(() => {
        console.log('初次渲染组件')
        // 更新， 卸载都会执行
    }, [])


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