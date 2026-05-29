# 浏览器存储

1. 可以举一些客户端需要存储数据的例子吗？
    - 用户是否登录
        cookie
    - 购物车内容
        Local Storage
    - 页面主题模式（浅色 / 深色
    - 表单草稿内容
    - 离线可用的数据

## 什么是 Cookie？
   
- 浏览器的无状态特性
浏览器本身是无状态的，这意味着每次请求都是独立的，服务器无法记住用户的状态。例如，当你访问一个网站时，服务器并不知道你之前访问过什么。
- 状态管理
为了在无状态的环境中管理用户的状态，开发者使用 Cookie。Cookie 允许服务器在用户的浏览器中存储信息，以便在后续请求中使用。

**Cookie** 是一种在用户的浏览器中存储小块数据的机制。它们通常用于保存用户的状态信息，比如登录状态、购物车内容等。
cookie-login
document.cookie = "username=John Doe";

- 会被 自动发送给服务器，适合用于身份认证（如 token 或 sessionId）。
- 每次请求都携带 cookie，影响性能。
- 只能存储字符串，且大小受限（一般最多4KB）。
- 支持设置 HttpOnly等。

## localStorage 和 sessionStorage
    HTML5 提供的 Web Storage

    https://github.com/bradtraversy/50projects50days/tree/master

    localStorage 

    session-storage


    localStorage 不会随请求发送，更适合存储本地状态。
    永久，除非主动清除 只能存储字符串
    sessionStorage 当前标签页会话 关闭自动清除 **每个 tab 独立**

localStorage 的最大容量有限，通常在 5MB 到 10MB 左右；而 IndexedDB 不受此限制，适合存储大型数据集，支持存储几十 MB 甚至 GB 级别的数据，例如复杂的 JSON 对象、图像等

localStorage 仅保存字符串键值对，不支持复杂的数据结构；IndexedDB 是真正的数据库系统，可以存储索引过的键值对、数组甚至嵌套对象，支持更高级的数据查询操作

localStorage 是同步的， indexDB 是异步的。

