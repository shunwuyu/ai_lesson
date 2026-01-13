import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// 引入 UI 组件
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 引入 API
import { registerUser } from "@/api/auth";

// 定义表单数据类型（手动）
type FormValues = {
  name: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 初始化表单（无 Zod resolver）
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 手动验证函数
  const validateForm = (data: FormValues): boolean => {
    const errors: Partial<Record<keyof FormValues, string>> = {};

    if (data.name.trim().length < 2) {
      errors.name = "用户名至少需要 2 个字符";
    }

    if (data.password.length < 6) {
      errors.password = "密码至少需要 6 个字符";
    }

    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "两次输入的密码不一致";
    }

    // 设置错误到 react-hook-form
    Object.entries(errors).forEach(([field, message]) => {
      form.setError(field as keyof FormValues, { type: "manual", message });
    });

    return Object.keys(errors).length === 0;
  };

  // 提交处理
  async function onSubmit(values: FormValues) {
    // 清除之前的手动错误
    form.clearErrors();

    // 手动验证
    if (!validateForm(values)) {
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        name: values.name,
        password: values.password,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "注册服务暂不可用，请稍后再试";
      // 可在此处添加 toast 提示（如需）
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 顶部 Header —— 注意：你需要确保 Header 组件存在 */}

      <main className="flex-1 p-6 pt-10">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">创建新账号</h1>
            <p className="text-sm text-muted-foreground">
              请输入您的信息以完成注册
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              
              {/* 用户名 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 密码 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="请输入密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 确认密码 */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="请再次输入密码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 提交按钮 */}
              <Button type="submit" className="w-full mt-6" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    注册中...
                  </>
                ) : (
                  "立即注册"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground mt-4">
            已有账号？{" "}
            <span 
              className="text-primary cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              去登录
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}