function createCache() {
    const data = new Map();
    
    return {
        set: (key, value) => {
            data.set(key, value);
        },
        get: (key) => {
            return data.get(key);
        }
    };
}

// data 永远不会被垃圾回收
const cache = createCache();

function createCache() {
    const data = new Map();
    
    const cache = {
        set: (key, value) => {
            data.set(key, value);
        },
        get: (key) => {
            return data.get(key);
        },
        clear: () => {
            data.clear();
        }
    };
    
    return cache;
}

// 使用完后清理
const cache = createCache();
// ... 使用
cache.clear();