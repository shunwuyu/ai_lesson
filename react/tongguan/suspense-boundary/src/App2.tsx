// React 的 Suspense 允许你在等待异步操作（如代码分割、数据获取等）完成时显示一个备用UI（例如加载指示器），从而提升用户体验。
import React, { Suspense } from 'react';
const LazyAaa = React.lazy(() => import('./Aaa'));

export default function App() {
  return <div>
    <Suspense fallback={'loading...'}>
      <LazyAaa></LazyAaa>
    </Suspense>
  </div>
}