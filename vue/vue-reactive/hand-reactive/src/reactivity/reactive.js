import { 
    mutableHandlers,
    shallowReactiveHandlers
} from './baseHandlers'
export const reactiveMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const ReactiveFlags = {
    RAW: "__v_raw", // 原生对象
    IS_REACTIVE: "__V_isReactive"  // obj.num.a  响应式
}
// 响应式
export function reactive(target) {
    // 修改后， 如何处理
    return createReactiveObject(target, reactiveMap, mutableHandlers)
} 
// 用户自己决定浅层的代理 
export function shallowReactive(target) {
    return createReactiveObject(
        target,
        shallowReactiveMap, // 区分， 浅层响应式单独存放
        shallowReactiveHandlers // 
    )
}

function createReactiveObject(target, proxyMap, proxyHandlers) {
    if (typeof target !== 'object') {
        console.warn(`reactive ${target} 必须是一个对象`)
        return target;
    }

    // 通过Proxy 创建代理 , 不同的map 存储不同类型的reactive依赖关系
    const existingProxy = proxyMap.get(target)
    if (existingProxy) {
        console.log('-------------cached', target)
        return existingProxy // Proxy  代理的是对象 
    }

    const proxy = new Proxy(target, proxyHandlers)
    proxyMap.set(target, proxy)  // 缓存
    return proxy
}