// src/pages/Mine.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Loading from '@/components/Loading';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Camera, Upload, Sparkles } from 'lucide-react';

export default function Mine() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isLogin, logout, aiAvatar } = useUserStore();
  console.log(user, "////");
  const navigate = useNavigate();

  // 打开 Drawer 时触发的操作
  const handleAction = async (type: string) => {
    console.log('执行操作:', type);
    setOpen(false);
    if (type === 'ai') {
      setLoading(true);
      await aiAvatar();
      setLoading(false);
    }
    // 其他逻辑如拍照、上传可在此扩展
    
  };

  // 登录状态检查
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <div className="bg-white p-6 pb-10 mb-4">
        <div className="flex items-center space-x-4">
          {/* 头像点击弹出 Drawer */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <div className="relative cursor-pointer group">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm transition group-hover:opacity-90">
                  <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {user.name?.charAt(0) || 'CN'}
                  </AvatarFallback>
                </Avatar>
                {/* 相机图标提示 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border">
                  <Camera className="h-3 w-3 text-gray-500" />
                </div>
              </div>
            </DrawerTrigger>

            {/* Drawer 内容 */}
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader className="text-left">
                  <DrawerTitle>修改头像</DrawerTitle>
                  <DrawerDescription>
                    请选择一种方式更新您的个人头像
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base"
                    onClick={() => handleAction('camera')}
                  >
                    <Camera className="mr-3 h-5 w-5 text-blue-500" />
                    拍照
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 text-base"
                    onClick={() => handleAction('upload')}
                  >
                    <Upload className="mr-3 h-5 w-5 text-green-500" />
                    从相册上传
                  </Button>

                  <Button
                    variant="default"
                    className="w-full justify-start h-14 text-base bg-gradient-to-r from-purple-600 to-indigo-600 border-none"
                    onClick={() => handleAction('ai')}
                  >
                    <Sparkles className="mr-3 h-5 w-5 text-yellow-300" />
                    AI 生成头像
                  </Button>
                </div>

                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full h-12">取消</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>

          {/* 用户信息 */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>
      </div>

      {/* 功能列表 */}
      <div className="px-4 space-y-4">
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center p-3 border-b border-gray-50 active:bg-gray-50 transition">
            <span className="font-medium">我的订单</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div 
          onClick={() => navigate('/git')}
          className="flex justify-between items-center p-3 border-b border-gray-50 active:bg-gray-50 transition">
            <span className="font-medium">git ai 规范</span>
            <span className="text-gray-400">&gt;</span>
          </div>
          <div className="flex justify-between items-center p-3 active:bg-gray-50 transition">
            <span className="font-medium">设置</span>
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>

        {/* 退出登录按钮 */}
        <Button
          variant="destructive"
          className="w-full mt-8 h-12 rounded-xl text-base font-semibold shadow-md shadow-red-100"
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>
      { loading && <Loading/> }
    </div>
  );
}