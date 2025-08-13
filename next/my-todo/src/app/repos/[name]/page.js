// app/repos/[name]/page.js
import { getRepoDetail } from '../../lib/githubApi';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

export default async function RepoDetail({ params }) {
  let repoData = null;
  let error = null;
  
  try {
    repoData = await getRepoDetail('shunwuyu', params.name);
  } catch (err) {
    error = err;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">仓库详情</h1>
        <div className="text-red-600">获取仓库信息失败: {error.message}</div>
        <div className="mt-4">
          <Link href="/repos" className="text-blue-600 hover:underline">
            ← 返回仓库列表
          </Link>
        </div>
      </div>
    );
  }

  if (!repoData?.repo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">仓库详情</h1>
        <div className="text-red-600">仓库不存在或已被删除</div>
        <div className="mt-4">
          <Link href="/repos" className="text-blue-600 hover:underline">
            ← 返回仓库列表
          </Link>
        </div>
      </div>
    );
  }

  const { repo, readme } = repoData;
  
  // 如果有 README，解析 Markdown 内容
  const readmeContent = readme ? 
    `<div class="prose max-w-none">${readme.content ? atob(readme.content) : ''}</div>` : 
    null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{repo.name}</h1>
          <Link href="/repos" className="text-blue-600 hover:underline">
            ← 返回列表
          </Link>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <p className="text-gray-700 mb-4 leading-relaxed">{repo.description || '暂无描述'}</p>
          
          <div className="flex flex-wrap gap-6 mb-4 text-sm">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
              <strong>语言:</strong> {repo.language || '未知'}
            </span>
            <span className="flex items-center">
              <strong>Stars:</strong> {repo.stargazers_count}
            </span>
            <span className="flex items-center">
              <strong>Forks:</strong> {repo.forks_count}
            </span>
            <span className="flex items-center">
              <strong>Issues:</strong> {repo.open_issues_count}
            </span>
          </div>
          
          <div className="text-sm text-gray-500">
            <span>创建于 {new Date(repo.created_at).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>更新于 {new Date(repo.updated_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* 仓库链接 */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">项目链接</h2>
          <div className="flex gap-4">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              GitHub 仓库
            </a>
            {repo.homepage && (
              <a 
                href={repo.homepage} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors"
              >
                项目主页
              </a>
            )}
          </div>
        </div>

        {/* README 内容 */}
        {readmeContent && (
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">项目说明</h2>
            <div 
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(readmeContent) 
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// 生成静态参数（可选，用于静态生成）
export async function generateStaticParams() {
  try {
    const repos = await getUserRepos();
    return repos.map(repo => ({
      name: repo.name,
    }));
  } catch (error) {
    return [];
  }
}