import { useRef, useState, useEffect } from "react";

export default function App() {
  // 1. useRef 保存 webWorker 实例
  // ref.current 在组件每一次重新渲染不会丢失、不会重新初始化
  const workerRef = useRef(null);

  // 页面状态
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 组件挂载的时候初始化 Worker，只创建一次线程
  useEffect(() => {
    // 实例化子线程
    workerRef.current = new Worker(new URL("./heavy.worker.js", import.meta.url));

    // 监听 worker 传回的计算结果
    workerRef.current.onmessage = (e) => {
      setResult(e.data.result);
      setLoading(false);
    };

    // 捕获子线程报错
    workerRef.current.onerror = (err) => {
      console.error("Worker异常：", err);
      setLoading(false);
    };

    // 组件销毁，关闭后台线程，释放资源，防止内存泄漏
    return () => {
      workerRef.current?.terminate();
    };
  }, []); // 空依赖数组：仅挂载执行一次

  // 触发耗时计算，向worker发送消息
  const startHeavyCalc = () => {
    setLoading(true);
    setResult(null);
    // 给子线程发送参数
    workerRef.current.postMessage({
      num: 88
    });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>useRef + WebWorker 耗时运算演示</h2>
      <p>开启子线程执行五百万次循环，主线程不会卡顿</p>

      <button onClick={startHeavyCalc} disabled={loading}>
        {loading ? "正在后台计算..." : "启动繁重计算任务"}
      </button>

      {result !== null && <h3>计算结果：{result}</h3>}
    </div>
  );
}