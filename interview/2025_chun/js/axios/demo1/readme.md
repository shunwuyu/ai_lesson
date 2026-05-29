- axios的底层是ajax还是fetch 可以手动指定吗
- 面试官为何要问？
  知识深度， 恐惧 源码
  axios 前端网络请求库

- Axios底层使用的是XMLHttpRequest对象，而非Fetch API。 不可以
- 为什么？
  Axios使用XMLHttpRequest是因为它在设计初期就采用了这一技术，提供了广泛的浏览器兼容性和丰富的功能特性。

- aiax和fetch的区别
  - Ajax 是一种基于 JavaScript 的异步请求技术，通常使用 XMLHttpRequest 对象实现，支持多种数据格式，灵活但较为繁琐。
    XMLHttpRequest
    - 创建XMLHttpRequest对象
      new XMLHttpRequest()
    - 配置请求：设置请求的方法（GET、POST等）、URL和其他参数
      xhr.open(method, url, async)
      async表示是否异步执行 默认 true
    - 发送请求：将请求发送到服务器。
      xhr.send(body） 
    - 监听服务器响应：
      通过xhr.onreadystatechange或xhr.onload等事件监听器来接收响应。当xhr.readyState变为4（完成）且xhr.status为成功状态码时，即可获取并处理响应数据。
      xhr.readyState 0 请求未初始化
      1（OPENED） 已建立请求
      2（HEADERS_RECEIVED） 请求已发送
      3（LOADING）： 正在下载响应内容。
      4 （DONE）：请求完成。

    - 处理响应数据
      可以通过xhr.responseText获取文本格式的响应数据，或者使用xhr.responseXML获取XML文档。
  - fetch 是现代浏览器支持的 API，基于 Promise，语法简洁，支持更好的链式调用和异步处理，默认返回 JSON，但不自动处理错误，需要手动捕获错误。fetch 提供了更简洁、现代的接口，替代了传统的 Ajax 方法。
    Request Response


- 如果有三个拦截器 [A, B, C]，这段代码相当于：
  Promise.resolve(data)
    .then(A)
    .then(B)
    .then(C)

  该方法使用Array的reduce方法将所有的拦截器函数串联成一个Promise链
  每个拦截器都会接收前一个拦截器的返回值作为输入
  第一个拦截器会接收到初始的data作为输入
  最终返回一个Promise，这个Promise会依次执行所有的拦截器