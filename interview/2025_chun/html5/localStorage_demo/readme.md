localStorage、sessionStorage、Cookie 的大小，区别

特性	localStorage	sessionStorage	Cookie
存储位置	浏览器本地存储	浏览器会话存储	客户端和服务器之间的请求头中传输
生命周期	持久化，除非手动清除或浏览器缓存被清理	页面关闭时清除（会话结束）	可以设置过期时间，默认是会话结束
数据大小限制	约 5MB（具体取决于浏览器）	约 5MB（具体取决于浏览器）	通常为 4KB 左右（每个域名）
访问范围	同源的所有页面都可以访问	同一标签页或窗口内的页面可以访问	同源的所有页面都可以访问
传输方式	不随 HTTP 请求自动发送	不随 HTTP 请求自动发送	随每次 HTTP 请求自动发送到服务器
安全性	无内置安全机制，需自行加密敏感信息	无内置安全机制，需自行加密敏感信息	可以设置 Secure 和 HttpOnly 标志
适用场景	存储不需要频繁同步到服务器的数据	存储仅在当前会话期间需要的数据	存储需要在客户端和服务器之间共享的数据
API 示例	localStorage.setItem('key', 'value')	sessionStorage.setItem('key', 'value')	document.cookie = "key=value"

- 1.html  设置例子
- session_demo
  1.html 直接打开 可以
  但是2.html 单独打开 无法获取 

在一个窗体下开起两个标签页面，它们的 sessionStorage 可以共享吗?Localstorage 呢?
在一个浏览器窗体下开启的两个标签页中，sessionStorage 不共享，每个标签页有独立的 sessionStorage。而 localStorage 在同一源下是共享的，所有标签页都可以访问和修改。