import React from "react";
import VirtualList from "./VirtualList";

const App: React.FC = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>虚拟列表示例</h2>
      <VirtualList />
    </div>
  );
};

export default App;