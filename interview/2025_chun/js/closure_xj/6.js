// # 异步操作陷阱
function fetchData() {
    const cache = new Map();
    
    return async (url) => {
        if (!cache.has(url)) {
            const response = await fetch(url);
            const data = await response.json();
            cache.set(url, data);
        }
        return cache.get(url);
    };
}

function fetchData() {
    const cache = new Map();
    const maxSize = 100;
    
    return async (url) => {
        if (!cache.has(url)) {
            if (cache.size >= maxSize) {
                // 清理最早的缓存
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }
            const response = await fetch(url);
            const data = await response.json();
            cache.set(url, data);
        }
        return cache.get(url);
    };
}