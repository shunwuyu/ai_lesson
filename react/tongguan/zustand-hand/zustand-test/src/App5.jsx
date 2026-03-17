import { createStore } from './zustand';

function App() {
    const store = createStore();

    // 1. 【订阅】注册一个监听器：只要状态变，它就自动执行
    store.subscribe(() => {
        console.log('🔔 通知：状态变了！最新数据是 ->', store.getState());
    });

    store.setState((prevState) => {
        console.log('   (回调内) 拿到旧值:', prevState);
        return { count: prevState.count + 1 }; // 10 + 1 = 11
    });

    console.log('\n4. 再基于旧值 * 2...');
    store.setState(prev => ({ count: prev.count * 2 })); // 11 * 2 = 22

    return <h1>请看控制台 👇</h1>;
}

export default App;