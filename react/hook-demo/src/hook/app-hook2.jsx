import { useState } from 'react';
import './app-hook.css';

const AppHook = () => {
    // const state = useState('龙');
    // console.log(state)
    const [emoji, setEmoji] = useState('🦖')
    const onClickEmoji = () => {
        setEmoji(emoji === '🐍'?'🦖':'🐍')
    }

    const [quantity, setQuantity] = useState(5)
    const onClickIncrease = () => {
        setQuantity(quantity + 1)
    }
    const onClickDecrease = () => {
        setQuantity(quantity - 1)
    }

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