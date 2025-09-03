import { useState } from 'react'
import { obj } from './a.js';

// ESM 只导出绑定（binding），不是值的拷贝：
// 如果写 obj.a += 1，模块间共享的 obj 会被修改。
function App() {
  obj.a += 1;
  console.log(obj.a);
  return (
    <>
     
    </>
  )
}

export default App
