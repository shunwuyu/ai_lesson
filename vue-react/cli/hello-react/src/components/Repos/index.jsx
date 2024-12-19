// GitHubRepos.js

import React, { useState, useEffect } from 'react';
import './index.css'; // 引入本地样式文件

function GitHubRepos() {
  // 定义状态变量
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 方法：获取仓库列表
  const fetchRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/vuejs/repos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载后获取仓库列表
  useEffect(() => {
    fetchRepos();
  }, []); // 空数组确保只在首次渲染时调用

  return (
    <div className="github-repos">
      <h2>GitHub Repositories</h2>
      {/* 加载状态显示 */}
      {loading && <p>Loading...</p>}
      {/* 错误信息显示 */}
      {error && <p>{error}</p>}
      {/* 仓库列表 */}
      {!loading && repos.length > 0 && (
        <ul>
          {repos.map((repo, index) => (
            <li key={index}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <span>({repo.stargazers_count} stars)</span>
            </li>
          ))}
        </ul>
      )}
      {/* 当没有找到仓库时的提示 */}
      {!loading && repos.length === 0 && <p>No repositories found.</p>}
    </div>
  );
}

export default GitHubRepos;