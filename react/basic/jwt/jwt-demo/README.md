- JWT
    JSON Web Token 用于实现无状态的身份认证与授权。

    http 无状态的， 服务器怎么识别你的身份呢？JWT 通过把你的身份信息打包成一个令牌来解决这个问题。

    登录时，服务器把用户 ID、过期时间等信息装进 JSON，用密钥签名后生成一串令牌发给客户端。之后每次请求，客户端都把令牌放在请求头里带过来。

    服务器拿到令牌后，不需要查数据库或 session，直接用同一把密钥验证签名， 解码拿到用户信息。

- mock
    - vite.config.js 
    - mock/test.js
    - post json token
    - get api/get