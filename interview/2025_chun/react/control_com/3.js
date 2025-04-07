// 受控组件
import React, { useState } from 'react';

function SearchBox() {
    const [query, setQuery] = useState(''); // 使用 useState 管理输入值

    const handleSearch = () => {
        console.log('Search Query:', query); // 使用受控状态
    };

    return (
        <div>
            <input
                type="text"
                value={query} // 受控组件的值
                onChange={(e) => setQuery(e.target.value)} // 更新状态
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBox;