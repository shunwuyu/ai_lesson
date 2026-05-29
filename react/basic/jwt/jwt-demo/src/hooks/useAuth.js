import { useLoginStore } from '../store/user';

export const useAuth = () => {
  const { user, token, isLogin, login, logout } = useLoginStore();
  return { user, token, isLogin, login, logout };
};