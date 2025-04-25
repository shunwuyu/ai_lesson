// App.tsx
import React, { Suspense, lazy } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

export default function App() {
  return (
    <div>
      <h1>首页</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  )
}
