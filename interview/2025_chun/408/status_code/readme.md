# 状态码
- 分类
    - 1xx (Informational)：信息性状态码，表示请求已被接收，继续处理。
    - 2xx (Success)：成功状态码，表示请求已成功处理。
    - 3xx (Redirection)：重定向状态码，表示需要进一步操作以完成请求。
    - 4xx (Client Error)：客户端错误状态码，表示请求有误或无法完成。
    - 5xx (Server Error)：服务器错误状态码，表示服务器在处理请求时发生错误。

- 常见状态码
    - 101 switch protocol
    - 200 OK: 请求成功，服务器返回所请求的数据。
    - 201 Created: 请求成功并创建了新资源。
    - 204 No Content: 请求成功，但没有返回内容。
    用户成功删除资源，服务器不需要返回任何数据。

    - 301 Moved Permanently: 请求的资源已被永久移动到新位置。
        网站重构后，旧链接重定向到新链接。
        308 Permanent Redirect: 表示请求的资源永久移动到另一个 URI，客户端应使用原始请求方法进行请求。
    - 302 Found: 请求的资源临时移动到新位置。
        临时维护页面，用户被重定向到维护通知页面。
        307 Temporary Redirect: 表示请求的资源临时移动到另一个 URI，客户端应使用原始请求方法（如 POST）进行请求。
    - 304 Not Modified: 
        资源未被修改，客户端可以使用缓存的版本。

- http://www.baidu.com 发生什么？
    307 Temporary Redirect: 表示请求的资源临时移动到另一个 URI，客户端应使用原始请求方法（如 POST）进行请求。
    https://www.baidu.com

