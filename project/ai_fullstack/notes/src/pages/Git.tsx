import Header  from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useGitStore } from '@/store/git';

const Git: React.FC = () => {
  const { loading, diff, setLoading, setDiff, getCommit, commit } = useGitStore();
  console.log(commit, "///");
  const handleSubmit = async () => {
    if (!diff.trim()) return;
    setLoading(true);
    try {
      // 模拟 AI 处理逻辑（如调用后端 API）
      await getCommit(diff)
      console.log('生成 Commit 日志:');
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="git提交助手" showBackBtn={true} />
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Git Diff 代码片段</h3>

      <div className="space-y-4">
        <textarea
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          placeholder="粘贴你的 git diff..."
          className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading || !diff.trim()}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>生成中...</span>
            </div>
          ) : (
            '生成 Commit 日志'
          )}
        </Button>
      </div>
      <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          ✨ 生成结果
          <span className="text-xs font-normal px-2 py-0.5 bg-green-100 text-green-700 rounded-full">DeepSeek-R1</span>
        </h3>
        <button 
          onClick={() => navigator.clipboard.writeText(commit)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          复制
        </button>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <p className="font-mono text-gray-800 whitespace-pre-wrap">{commit}</p>
      </div>
    </div>
    </div>
    </div>
  )
}
export default Git