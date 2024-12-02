import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction} from "react"
export const useEmoji = ():[string, Dispatch<SetStateAction<string>>] => {
    const [emoji, setEmoji] = useState(() => {
        console.log('----')
        return '🦖'
    })

    useEffect(() => {
        console.log('useEffect', emoji)
        // 更新， 卸载都会执行
        return () => {
            console.log('useEffect, 清理effect')
        }
    }, [emoji])

    return [emoji, setEmoji]
}