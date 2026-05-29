import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    // 假设这是验证逻辑
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "123123") {
      // 登录成功，设置 isLogin
      localStorage.setItem('isLogin', 'true');
      
      // 返回之前试图访问的页面
      navigate(from, { replace: true });
    } else {
      alert("用户名或密码错误！");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>登录</h1>
      <input name="username" placeholder="用户名" required />
      <input type="password" name="password" placeholder="密码" required />
      <button type="submit">登录</button>
    </form>
  );
}

export default Login;