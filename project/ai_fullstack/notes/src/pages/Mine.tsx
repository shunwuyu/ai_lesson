import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Camera, Upload, Sparkles } from "lucide-react";

export default function Mine() {
  const [open, setOpen] = useState(false);
  const { user, isLogin, logout, aiAvatar } = useUserStore();
  const navigate = useNavigate();

  const handleAction = async (type: string) => {
    console.log("执行操作:", type);
    if (type === 'ai') {
      await aiAvatar();
    }
    // 这里可以根据 type 处理具体逻辑（如调用摄像头等）
    setOpen(false); 
  };

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
      <div className="bg-white p-6 pb-10 mb-4">
        <div className="flex items-center space-x-4">
          {/* 这里是修复 Bug 的关键点 */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              {/* 1. 使用 asChild 2. 外层包一个 div 3. div 会接收 ref */}
              <div className="relative cursor-pointer group">
                <Avatar className="h-16 w-16 border-2 border-white shadow-sm transition group-hover:opacity-90">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                    {user.name?.charAt(0) || 'CN'}
                  </AvatarFallback>
                </Avatar>
                {/* 移动端常见的头像右下角小相机图标提示 */}
                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border">
                  <Camera className="h-3 w-3 text-gray-500" />
                </div>
              </div>
            </DrawerTrigger>

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

          <div className="flex-1">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-500">ID: {user.id}</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center p-3 border-b border-gray-50 active:bg-gray-50 transition">
            <span className="font-medium">我的订单</span>
            <span className="text-gray-400">{'>'}</span>
          </div>
          <div className="flex justify-between items-center p-3 active:bg-gray-50 transition">
            <span className="font-medium">设置</span>
            <span className="text-gray-400">{'>'}</span>
          </div>
        </div>

        <Button 
          variant="destructive" 
          className="w-full mt-8 h-12 rounded-xl text-base font-semibold shadow-md shadow-red-100" 
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>
    </div>
  );
}