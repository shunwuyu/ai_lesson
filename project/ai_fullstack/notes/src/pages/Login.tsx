import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useUserStore
} from '../store/user'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { isLogin, login } = useUserStore();
  if (isLogin) {
    navigate('/', { replace: true });
  }
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) return;
    setLoading(true);
    try {
      await login({ username: formData.username, password: formData.password });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('登录失败:', error);
    }
    setLoading(false);
    // 模拟登录请求
    // login({ id: 1, name: formData.username });
    
    // 登录成功后返回上一页或去我的页面
    // navigate('/mine', { replace: true });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">登录</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input 
              id="username" 
              placeholder="请输入用户名" 
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input 
              id="password" 
              placeholder="请输入密码" 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              登录中...
            </>
          ) : (
            '立即登录'
          )}
          </Button>
        </form>
        
        <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
          暂不登录，回首页
        </Button>
      </div>
    </div>
  );
}