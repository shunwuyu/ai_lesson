# JWT

- 一旦Token泄露，攻击者可长期冒用。若缩短有效期，用户频繁登录，体验差。
    JWT双Token机制包含Access Token（短时效）和Refresh Token（长时效）。流程：用户登录获取双Token；后续请求用Access Token，过期后用Refresh Token向服务端换取新Access Token；Refresh Token也过期则需重新登录。

- npx create-next-app@latest demo
-   pnpm i prisma --save-de
    pnpm i @prisma/client
    npm install prisma @prisma/client
    npm install jsonwebtoken jose bcryptjs
    npm install -D @types/bcryptjs
- # 初始化 Prisma 配置 (创建 prisma/schema.prisma 和 .env)
npx prisma init
npx prisma db push    



## 新增posts表
- npx prisma migrate reset
- npx prisma migrate dev --name create-post-table
- npx prisma studio 看数据