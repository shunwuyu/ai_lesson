// create 支持api调用 传入状态
import {
    useEffect,
    useState
} from 'react';
  
  // 私有了， 不向外暴露
const createStore = (createState) => {
    let state;
    // Set 集合，不会重复 多次调用 subscribe 不会重复订阅
    // listeners = 所有订阅者
    const listeners = new Set()
    // 获取状态
    const getState = () => state
    // 修改状态
    // replace 是否覆盖整个状态
    const setState = (partial, replace) => {
        // 支持函数更新， state 是旧值
        const nextState = typeof partial === 'function' ? partial(state) : partial;
        // 状态确实改变了， 没改就不做 只比较值
        if (!Object.is(nextState, state)) {
            const previousState = state;
    
            // 真个替换
            if(!replace) {
                // 支持 state 合并
                state = (typeof nextState !== 'object' || nextState === null)
                ? nextState
                : Object.assign({}, state, nextState);
            } else {
                // 整个替换
                state = nextState;
            }
            listeners.forEach((listener) => listener(state, previousState));
        } else {
            listeners.forEach((listener) => listener(state, state));
        }
    }
    // 订阅
    const subscribe = (listener) => {
        listeners.add(listener)
        // 取消订阅 
        return () => listeners.delete(listener)
    }

    const destroy= () => {
        listeners.clear()
    }
    // 返回 api
    const api = { setState, getState, subscribe, destroy }
    // 初始化状态
    state = createState(setState, getState, api)
    return api
}
  
  // 使用 store 自定义hook 
const useStore = (api, selector) => {
    // 借助useState 强制渲染
    const [,forceRender ] = useState(0);
    useEffect(() => {
        // 订阅状态变化 只一次
        api.subscribe((state, prevState) => {
            // 关心的状态执行了
            const newObj = selector(state);
            const oldobj = selector(prevState);

            if(newObj !== oldobj) {
                forceRender(Math.random());
            }       
        })
    }, []);
    return selector(api.getState());
}
  
export const create = (createState) => {
    const api = createStore(createState);
    // 闭包 只用了哪个状态
    const useBoundStore = (selector) => {
        // (state) => state.count '???????'
        console.log(selector, '???????') 
        return useStore(api, selector)
    } 
    // 将 api 的方法挂载到 useBoundStore 上
    // 这样就可以直接调用 api 的方法
    Object.assign(useBoundStore, api);
    // 返回 useBoundStore
    return useBoundStore;
}