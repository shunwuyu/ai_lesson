// 大厂hooks 手写题目
// url 发送请求 获取数据
// 响应式 -> hook 
// loading 
// 失败 
// 自定义了useResize useChart useFetch等自定义hooks,在实现loadmore时，
// 封装了useIntersectionObserver。
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    // 数据
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // 翻页功能 url  ?page=1  url.value =   data响应式更新-> 会让 页面
    // 热跟新
    useEffect(async () => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error('请求失败')
            }
            const result = await response.json()
            setData(result)
        } catch(error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, [url]);
    
    return {
        data,
        error,
        isLoading
    }
}