# FastAPI 双 Token

## 一、先搞懂：JWT 单 Token 有什么痛点？

普通单 JWT 方案：登录成功下发**一个 Token**，前端拿着它(Authorization)请求接口。

- 如果有效期设置**很长（比如 7 天）**：令牌一旦泄露，攻击者可以一直用，直到过期，**无法紧急吊销**；
- 如果有效期设置**很短（比如 15 分钟）**：用户频繁掉线，需要反复登录，体验很差；
- JWT 本身**无状态**，默认不能中途作废，除非引入黑名单，但黑名单会增加维护成本。

核心矛盾：**安全（短有效期） 和 用户体验（不用频繁登录）冲突**

## 二、 双 Token 是什么？解决思路

两个令牌，分工完全不一样：

1. **Access Token（访问令牌）**
   - JWT 格式，**有效期很短**（例如 15min）
   - 作用：正常业务接口鉴权，请求 header 携带 `Authorization: Bearer xxx`
   - 泄露风险窗口很小，就算被偷，很快自动失效

2. **Refresh Token（刷新令牌）**
   - 可以是 JWT，也可以是存库的随机字符串（推荐存库版本，可控可吊销）
   - **有效期很长**（例如 7 天）
   - 不用来访问业务接口，**只用来刷新 AccessToken**
   - ✅ 关键优势：存在数据库里！管理员可以直接删除这条记录，立刻让这个刷新令牌失效，实现登出、踢下线

### 完整流程

1. 用户登录 → 校验账号密码 → 生成 AccessToken + RefreshToken，**RefreshToken 存入数据库，绑定用户 ID**
2. 前端拿到两个 token：
   - 每次请求接口带 AccessToken
   - 前端判断 AccessToken 快要过期 / 401 过期时，调用 `/auth/refresh` 接口，带上 RefreshToken
3. 后端校验 RefreshToken：
   - 查数据库是否存在、是否过期、是否启用
   - 校验通过 → 下发**新的 AccessToken（可选同时换新 RefreshToken，滚动刷新）**
4. 用户登出：后端删除数据库里这条 RefreshToken，直接失效

> 
> 对比单 Token：短 access 保证泄露影响小；refresh 存库，支持主动吊销，兼顾安全和体验。

## 开发流程

1. pip install -r requirements.txt
psycopg2-binary 是 Python 连接 PostgreSQL 数据库的预编译驱动包
passlib[bcrypt] 就是 Python 密码哈希库 passlib 加上 bcrypt 加密算法插件，专门用来安全地哈希和校验用户密码。
python-jose[cryptography] 是 Python 的 JWT（JSON Web Token）处理库，自带 cryptography 加密后端，专门用来签发和校验 token。
pydantic-settings 是 Pydantic 的扩展库，专门用来从环境变量、.env 文件等地方读取配置，并自动校验成强类型对象。

2. psql docker 

docker-compose.yml
docker compose up -d 

注册服务器 填 pg_login 

- 解释下为什么要这么建表
