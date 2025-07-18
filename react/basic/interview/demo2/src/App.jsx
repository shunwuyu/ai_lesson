import { useState } from 'react'
import './App.css'

function SearchInput({ initialSearch }) {
  // 使用 props 初始化本地状态，并允许其独立变化
  const [searchText, setSearchText] = useState(initialSearch);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <label>搜索：</label>
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
      />
      <p>当前搜索词：{searchText}</p>
    </div>
  );
}


function App() {
  const [searchTerm] = useState("react");
  return (
    <div>
      <h2>父组件中的默认搜索词: {searchTerm}</h2>
      <SearchInput initialSearch={searchTerm} />
    </div>
  )
}

export default App
