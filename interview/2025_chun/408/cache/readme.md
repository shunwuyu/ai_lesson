https://juejin.cn/post/6844903810393964551


- 浏览器缓存
    - 强缓存
        - Expires
        这是 HTTP 1.0 的字段，表示缓存到期时间，是一个绝对的时间 (当前时间+缓存时间)。在响应消息头中，设置这个字段之后，就可以告诉浏览器，在未过期之前不需要再次请求。
        过期的缺点：

        在这里，其他电脑访问服务器，若修改电脑的本地时间，会导致浏览器判断缓存失效 这里修改缓存时间，会导致缓存时间不一致
        - Cache-Control
        已知Expires的缺点之后，在HTTP/1.1中，增加了一个字段Cache-control，该字段表示资源缓存的最大有效时间，在该时间内，客户端不需要向服务器发送请求
        相对时间

    - 协商缓存
        - Last-Modified if-modified-since
        在浏览器第一次请求资源时，服务器会在响应头中添加Last-Modified字段，表示该资源最后修改的时间
        
        - Etag 和 If-None-Match

        
我会从浏览器缓存和HTTP缓存两方面回答：使用localStorage/sessionStorage存储数据，配置Cache-Control/ETag控制资源缓存策略，对静态资源使用强缓存，动态接口使用协商缓存，提升访问性能。