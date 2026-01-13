import { create } from 'zustand';

// 定义状态类型
interface AuthState {
  isLogin: boolean; // 是否已登录
  loading: boolean; // 登录请求加载状态
  // 设置登录状态
  setIsLogin: (status: boolean) => void;
  // 设置加载状态
  setLoading: (status: boolean) => void;
  // 登录方法（接收账号、密码）
  login: (username: string, password: string) => Promise<boolean>;
  // 退出登录（可选，方便后续扩展）
  logout: () => void;
}

// 创建 Zustand Store
export const useAuthStore = create<AuthState>((set) => ({
  // 初始状态
  isLogin: false,
  loading: false,

  // 修改登录状态
  setIsLogin: (status) => set({ isLogin: status }),

  // 修改加载状态
  setLoading: (status) => set({ loading: status }),

  // 登录核心逻辑
  login: async (username, password) => {
    try {
      // 1. 开启加载状态
      set({ loading: true });

      // 2. 模拟接口请求（替换为真实 axios 请求即可）
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 3. 验证账号密码（admin / 123456）
      if (username === 'admin' && password === '123456') {
        // 4. 验证通过，设置登录状态为 true
        set({ isLogin: true });
        return true;
      } else {
        // 5. 验证失败，抛出错误
        throw new Error('账号或密码错误，请输入 admin / 123456');
      }
    } catch (error) {
      // 6. 捕获错误，返回登录失败
      console.error('登录失败：', error);
      return false;
    } finally {
      // 7. 无论成功失败，关闭加载状态
      set({ loading: false });
    }
  },

  // 退出登录（重置状态）
  logout: () => set({ isLogin: false }),
}));