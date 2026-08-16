import { useState, useTransition } from "react";

export default function App() {
  const [showList, setShowList] = useState(false);
  // `isPending` 是一个布尔值，表示**当前是否有过渡（transition）更新正在进行中**
//   - 调用 `startTransition(fn)` 后，`fn` 里的状态更新会被标记为 "低优先级过渡"，
//   `isPending` 立即变为 `true`
// - 过渡更新完成渲染后，`isPending` 自动变回 `false`
// "必须立即响应的更新" 和 "可以延迟的更新"
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setShowList(!showList);
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleClick}>
        {showList ? "隐藏列表" : "显示列表"}
      </button>

      {isPending && (
        <p style={{ color: "red" }}>切换中...</p>
      )}

      {showList &&
        Array.from({ length: 50000 }).map((_, i) => (
          <div key={i}>第 {i} 行</div>
        ))}
    </div>
  );
}