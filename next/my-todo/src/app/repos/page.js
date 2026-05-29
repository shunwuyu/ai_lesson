// app/repos/page.js
import Link from 'next/link';
import { getUserRepos } from '../lib/githubApi';

export default async function ReposPage() {
  let repos = [];
  
  try {
    repos = await getUserRepos();
  } catch (error) {
    console.error('加载仓库失败:', error);
  }

  if (repos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">我的开源项目</h1>
        <div className="text-red-600">加载仓库列表失败，请稍后重试。</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的开源项目</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {repos.map(repo => (
          <div key={repo.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                href={`/repos/${repo.name}`} 
                className="text-blue-600 hover:underline"
              >
                {repo.name}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{repo.description || '暂无描述'}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                {repo.language || '未知'}
              </span>
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
            <div className="mt-4 text-xs text-gray-400">
              更新于 {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}