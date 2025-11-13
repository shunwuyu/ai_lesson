import { Button, Card, CardContent, Input } from '@/components/ui';
import { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    childName: '',
    childAge: '',
  });

  const [step, setStep] = useState(1); // 1: 手机验证, 2: 设置密码, 3: 孩子信息

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // 注册逻辑
      console.log('Register:', formData);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Input
              label="手机号"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="请输入手机号"
              required
            />
            <div className="flex gap-2">
              <Input
                label="验证码"
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="请输入验证码"
                required
              />
              <Button type="button" variant="outline" className="mt-6">
                获取验证码
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Input
              label="设置密码"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="请输入密码"
              required
            />
            <Input
              label="确认密码"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="请再次输入密码"
              required
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">设置孩子信息</h3>
              <p className="text-neutral-600 text-sm">帮助我们为您推荐合适的绘本</p>
            </div>
            <Input
              label="孩子姓名"
              type="text"
              value={formData.childName}
              onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
              placeholder="请输入孩子姓名"
              required
            />
            <Input
              label="孩子年龄"
              type="number"
              value={formData.childAge}
              onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
              placeholder="请输入孩子年龄"
              required
            />
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                兴趣标签（可选）
              </label>
              <div className="flex flex-wrap gap-2">
                {['动物', '科学', '艺术', '历史'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="px-3 py-1 rounded-full text-sm border border-neutral-300 hover:bg-neutral-50"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">创建账户</h2>
          <p className="text-neutral-600">步骤 {step}/3</p>
        </div>
        
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}
            
            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  上一步
                </Button>
              )}
              <Button type="submit" className="flex-1">
                {step === 3 ? '完成注册' : '下一步'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-600">已有账户？</span>
            <a href="/login" className="text-primary-600 hover:text-primary-500 ml-1">
              立即登录
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;