import { useState, useEffect } from "react"

export const useEmoji = () => {
    const [emoji, setEmoji] = useState(() => {
        console.log('useState: 设置Emoji初始值')
        return '🦖'
    })

    useEffect(() => {
        console.log('useEffect:', emoji);
        return () => {
            console.log('useEffect: 清理Effect ~~')
        }
    }, [emoji])

    return [emoji, setEmoji];
}