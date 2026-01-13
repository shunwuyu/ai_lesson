import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const [username, setUsername] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    // 模拟登录请求
    login({ id: 1, name: username });
    
    // 登录成功后返回上一页或去我的页面
    navigate('/mine', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">登录</h1>
          <p className="text-gray-500">请输入您的用户名以继续</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input 
              id="username" 
              placeholder="Admin" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            立即登录
          </Button>
        </form>
        
        <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
          暂不登录，回首页
        </Button>
      </div>
    </div>
  );
}