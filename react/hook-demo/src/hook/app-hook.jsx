import { useState, useEffect } from 'react';
import './app-hook.css';
import { useEmoji } from './use-emoji';

const AppHook = () => {
    // const state = useState('龙');
    // console.log(state)
    // const [emoji, setEmoji] = useState('🦖')
    const [emoji, setEmoji] = useEmoji()
    const [quantity, setQuantity] = useState(5)
    const onClickEmoji = () => {
        setEmoji(emoji === '🐍'?'🦖':'🐍')
    }

    const onClickIncrease = () => {
        setQuantity(quantity + 1)
    }
    const onClickDecrease = () => {
        setQuantity(quantity - 1)
    }

    // useEffect(() => {
    //     console.log('useEffect:', emoji);
    // })

    // useEffect(() => {
    //     console.log('useEffect:', emoji);
    //     return () => {
    //         console.log('useEffect: 清理Effect ~~')
    //     }
    // })
    // update emoji
    
    // DidMount
    useEffect(() => {
        console.log('初次渲染组件');    
    }, [])
    
    return (
    <div className="app-hook">
        {/* <h1>{emoji}</h1>
        <button onClick={onClickEmoji}>表情符号</button>     */}
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