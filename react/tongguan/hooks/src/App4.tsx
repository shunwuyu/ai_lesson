import React, { useState, useLayoutEffect,  useRef } from 'react';

function App() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const divRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
      setHeight(divRef.current.offsetHeight);
    }
  }, []); // 空数组意味着此效果仅在组件挂载和卸载时运行

  return (
    <div>
      <div ref={divRef} style={{ border: '1px solid blue', padding: '20px' }}>
        调整我的大小
      </div>
      <h3>元素的宽度: {width}px</h3>
      <h3>元素的高度: {height}px</h3>
    </div>
  );
}

export default App;