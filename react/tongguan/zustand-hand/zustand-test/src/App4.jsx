import { createStore } from './zustand';

function App() {
    const store = createStore();

    // 1. 【订阅】注册一个监听器：只要状态变，它就自动执行
    store.subscribe(() => {
        console.log('🔔 通知：状态变了！最新数据是 ->', store.getState());
    });

    console.log('1. 初始状态:', store.getState());

    // 2. 【发布】修改状态
    console.log('\n2. 正在修改状态为 10...');
    store.setState({ count: 10 }); 
    // 👆 上面这行代码执行后，会自动触发上面的 subscribe 回调

    console.log('\n3. 正在修改状态为 99...');
    store.setState({ count: 99 }); 
    // 👆 再次自动触发

    return <h1>请看控制台 👇</h1>;
}

export default App;