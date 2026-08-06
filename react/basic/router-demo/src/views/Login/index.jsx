import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  // 用来 编程式跳转路由
  const navigate = useNavigate();
  // 获取当前路由对象包含 pathname、state、search
  const location = useLocation();
  // ES11）引入的可选链运算符（Optional Chaining
  // 从哪个页面跳转过来的， 如果没有，默认跳转到 / 首页
  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    // 假设这是验证逻辑
    // 浏览器原生 API
    // 把表单元素（input、select 等）按 name 收集成键值对集合 ，
    // 通过 .get(name) 读取
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    if (username === "admin" && password === "123123") {
      // 登录成功，设置 isLogin
      localStorage.setItem('isLogin', 'true');
      
      // 返回之前试图访问的页面
      // replace: true 表示 替换浏览器历史记录中的当前条目 
      // ，登录页不会被保留，登录成功后点「返回」不会再回到登录页。
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