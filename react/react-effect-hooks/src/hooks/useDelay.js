import { useState, useEffect } from 'react'
export const useDelay = (delayTime) => {    
    const [done, setDone] = useState(false)
    // 副作用focus   onMouted onUnmounted onUpdate 三合一
    useEffect(() => {
        // onMouted
        const delay = setTimeout(() => {
            setDone(true)
        }, delayTime)
        // onUnmounted
        return () => clearTimeout(delay)
    // 修改了delayTime 
    }, [delayTime])
    // unMounted 去回收定时器
    return done
}