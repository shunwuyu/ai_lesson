- ?. 可选链操作符
  result?.id
- prisma
  ORM
  - npx prisma init 
    - 在项目根目录下初始化 Prisma   prisma 目录 
    - 编辑数据库
      sqlite model 申明
    - npx prisma generate 生成 Prisma 客户端
    - npx prisma migrate dev --name init
      创建sql 
    - 装sqlite 插件

- refresh token
  1. 安全性
    - 短期访问令牌：accessToken 通常设置为较短的过期时间（如几分钟或几小时），以减少因令牌泄露造成的安全风险。如果 accessToken 泄露，攻击者只能在短时间内利用它。
    - 长期刷新令牌：refreshToken 通常设置为较长的过期时间（如几天或几个月），用于在 accessToken 过期后获取新的 accessToken。即使 refreshToken 泄露，由于它的使用频率较低，攻击者也难以立即利用它。
  2. 用户体验
    - 无缝续签：用户不需要频繁重新登录。当 accessToken 过期时，客户端可以使用 refreshToken 自动获取新的 accessToken，用户不会察觉到中断。
    - 减少用户干扰：用户不需要因为 accessToken 过期而频繁输入用户名和密码，提高了用户体验。
  3. 撤销和管理
  撤销访问：如果需要撤销某个用户的访问权限，可以删除或失效其 refreshToken，从而阻止其获取新的 accessToken。
  细粒度控制：可以对 refreshToken 进行更细粒度的管理，例如限制每个用户的 refreshToken 数量，或者在用户登出时删除 refreshToken。
  4. 防止令牌滥用
  防止重复使用：每次使用 refreshToken 获取新的 accessToken 时，可以生成一个新的 refreshToken，并使旧的 refreshToken 失效，防止令牌被重复使用。

- h3
- i18n
  - 安装 @nuxtjs/i18n 模块：
  npm install @nuxtjs/i18n
  - 配置 nuxt.config.ts
  modules: [
    ['@nuxtjs/i18n', {
      vueI18n: "@/config/nuxtjsI18n"
    }]
  ],
  - locales

- node stream 模块
- jina reader 帮助我们将html -> markdown