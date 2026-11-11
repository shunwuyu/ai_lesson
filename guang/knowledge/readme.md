# 企业级知识库

## 创建项目
- nest new knowledge-backend
- npm init vite
  knowledge-frontend  react + ts

## antd 组件库
- 安装
Ant Design 是一套开箱即用、规范统一的企业级组件库，大幅降低后台管理系统的开发成本、统一 UI 交互，让开发者聚焦业务而非基础界面。
- 提供 antd 全局应用上下文，支持静态弹窗、消息通知等组件无需挂载容器直接调用。
```js
  import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { 
  // 引入全局配置提供器
  // 用于配置 antd 组件库的全局样式
  // 例如：颜色、字体、间距、语言包等  国际化
  ConfigProvider, 
  // 引入 antd 应用组件
  // 用于包裹应用组件，提供全局应用上下文
  // message/modal/notification
  App as AntdApp 
} from 'antd'
import zhCN from 'antd/locale/zh_CN'

createRoot(document.getElementById('root')!).render(
  <ConfigProvider
      locale={zhCN}
      // 配置主题
      // 例如：颜色、字体、间距、圆角等
      theme={{
        // 主题配置
        // `theme.token` 是 antd 的**设计令牌**，存放主题基础样式变量（主色、圆角等）
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 6,
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>,
)
```


## echarts
- 安装 pnpm i echarts

## 配置路由并跳转到首页
- 安装react-router-dom 
- main.tsx 配置路由 
  ```ts
  import { BrowserRouter } from 'react-router-dom'
  createRoot(document.getElementById('root')!).render(
    +<BrowserRouter>
      <App />
    + </BrowserRouter>,
  )
  ```
- 路由守卫
  根路由`/`挂载登录守卫组件 Guard
  校验通过后渲染布局容器 AppLayout
  并承接其下所有子路由
  包裹在 Guard 标签内部的 JSX 内容，作为 Guard 的 children 属性传入。
  ```js
  import { Navigate, Route, Routes } from 'react-router-dom'
  import './App.css'
  import { useAuth } from './auth'
  //  引入布局组件 采用侧边导航 + 顶部栏 + 主内容区的经典三栏布局，
  import AppLayout from './layouts/AppLayout'
  import LoginPage from './pages/LoginPage'

  function Guard({ children }: { children: ReactNode }) {
    const user = useAuth();
    // `replace`：替换当前浏览器历史记录，不新增一条历史。
    // 规避返回按钮再次回到受保护路由
    if (!user) return <Navigate to="/login" replace />
    return children
  }

  function App() {

    return (
      <Routes>
        {/* 跳出Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Guard>
              <AppLayout />
            </Guard>
          }
        >
        </Route>
      </Routes>
    )
  }

  export default App

  ```
  ```js
  function AppLayout() {
  return (
    <div>
      AppLayout
    </div>
  )
}

export default AppLayout
  ```
  ```js
  import { useState } from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import { BrandLogo } from '../components/BrandLogo'
import { useNavigate } from 'react-router-dom'


export default function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  return (
    <div className="kh-login">
      <Card className="kh-login-card">
        <div className="kh-login-title">
          <BrandLogo size={40} />
          <h1>Knowledge Hub</h1>
          <p>登录后使用文档、检索、问答与图谱</p>
        </div>
        <Form
          layout="vertical"
          initialValues={{ username: 'user', password: '123456' }}
          // 表单点提交、校验通过之后就跑 onFinish，values 就是表单收集到的所有输入值。
          onFinish={async (values: { username: string; password: string }) => {
            setLoading(true)
          }}
        >
          <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
            <Input size="large" placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password size="large" placeholder="密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}
  ```
- 跨域和axios 配置
  - vite 代理 开发环境
  **反向代理**。
  te 开发服务器作为中间服务，把前端 `/api` 请求转发给后端 3000 服务，浏览器不知情。
  ```
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        timeout: 0,
        proxyTimeout: 0,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  ```
  nginx 代理 线上环境
  ```
  server {
    listen 80;
    server_name localhost;

    # 前端静态资源（打包后的dist）
    location / {
        root /xxx/dist;
        index index.html;
        try_files $uri $uri/ /index.html; # react路由history模式必加
    }

    # 和vite proxy对齐
    location /api/ {
        proxy_pass http://127.0.0.1:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 0;
        proxy_read_timeout 0;
    }
}

## 登录接口前端

- 没用用axios, 手写了fetch 
  封装 fetch， Request->get+post，统一错误处理，泛型约束响应类型，简化业务调用。 
  ```js
  import { clearAuth, getAccessToken } from '../auth'

  const API_BASE = import.meta.env.VITE_API_BASE || '/api'

  /**
  * 自定义 API 请求异常类
  * 继承自标准 Error，用于统一封装接口请求失败时的状态码与错误信息
  */
  export class ApiError extends Error {
    /** 接口返回的 HTTP 状态码（如 401、404、500 等）public 属性 不写就是public */
    status: number

    /**
    * 构造函数
    * @param status  HTTP 状态码
    * @param message 错误提示文案
    */
    constructor(status: number, message: string) {
      super(message) // 调用父类 Error 的构造方法，设置错误消息
      this.status = status // 将状态码挂载到实例上，方便外部通过 err.status 读取
    }
  }

  async function tryRefresh() {
    return true
  }

  /**
  * 从接口返回体中提取错误文案，提取不到则返回兜底文案
  * @param body 接口返回的原始数据
  * @param fallback 兜底提示（如“请求失败”）
  */
  // unknown 安全的 any，使用前必须校验。
  function errorMessage(body: unknown, fallback: string) {
    // 1. body 为空或不是对象，直接返回兜底文案
    if (!body || typeof body !== 'object') return fallback

    // 2. 尝试取 body.message 字段
    const message = (body as { message?: unknown }).message

    // 3. 是字符串就直接返回
    // unknown 需要断言成 string 才能用 typeof 检查类型
    if (typeof message === 'string') return message

    // 4. 是字符串数组就用分号拼接（兼容后端返回 ["错误1", "错误2"] 的情况）
    if (Array.isArray(message)) return message.filter((x) => typeof x === 'string').join('；')

    // 5. 其他情况（如 message 是数字、对象等）返回兜底文案
    return fallback
  }

  export async function request<T>(
    path: string,
    // RequestInit 内置类型， 对应 fetch 第二个参数的配置对象（method、headers、body 等）。
    init: RequestInit = {},
    // 是否重试
    retry = true,
  ): Promise<T> {
    // 添加 headers
    // Headers 是浏览器原生 API，用来封装 HTTP 请求头，方便增删改查头信息。
    // 比如 Content-Type, Authorization等。
    const headers = new Headers(init.headers)
    // 表单数据判断
    const isForm = init.body instanceof FormData
    // 非表单数据，且没有 Content-Type 头，添加 Content-Type: application/json
    // 后端靠 `Content-Type` 识别请求体格式，告诉它这是 JSON，
    // 方便解析 body；表单 FormData 浏览器会自动带上，不用手动设置。
    if (!isForm && !headers.has('Content-Type') && init.body) {
      headers.set('Content-Type', 'application/json')
    }
    // 添加 Authorization 头
    const token = getAccessToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
    // 发送请求
    const res = await fetch(`${API_BASE}${path}`, { ...init, headers })
    
    // 拦截 401：发现请求因未授权被拒，且当前允许重试。
    // 防死循环：排除掉登录和刷新接口本身，避免它们失败后无限递归调用。
    // 自动续期：调用 tryRefresh() 尝试换新 Token，成功后把原请求重发一遍
    // （retry 设为 false 防止二次重试）。
    // 兜底处理：如果刷新也失败了，直接清除本地登录态并抛出异常，让用户重新登录。
    if (res.status === 401 && retry && !path.startsWith('/auth/login') && !path.startsWith('/auth/refresh')) {
      const ok = await tryRefresh()
      if (ok) return request<T>(path, init, false)
      clearAuth()
      throw new ApiError(401, '未登录或登录已过期')
    }

    const text = await res.text()
    // unknown 是 TypeScript 里的“未知类型”，可以理解为“安全的 any”。
    // 先把 JSON.parse 的结果当成一个“我还不知道它长啥样”的东西。这样做通常是
    // 为了消除类型报错，
    // 或者作为一个中间跳板，方便你在后面再把它断言成具体的类型（比如 as T）。
    // any 是“随便你操作，出事我不负责”；unknown 是“先拿着，但想用
    // 的时候必须告诉我它具体是什么类型”。
    const data = text ? (JSON.parse(text) as unknown) : null
    // fetch会自带一个 ok属性 true 状态码在 200–299 之间
    // false 状态码是 4xx、5xx 等
    if (!res.ok) {
      throw new ApiError(res.status, errorMessage(data, res.statusText || '请求失败'))
    }
    return data as T
  }

  // T 泛型 响应数据类型
  export function get<T>(path: string) {
    return request<T>(path)
  }

  // unknown 的作用是允许传入任意类型的请求体，同时保持类型安全。
  export function post<T>(path: string, body?: unknown) {
    return request<T>(path, {
      method: 'POST',
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  }
  ```
  ```js
  import { post } from './client'
  import type {
    LoginResult
  } from '../types'

  export const authApi = {
    login: (username: string, password: string) =>
      post<LoginResult>('/auth/login', { username, password }),
  }

  ```ts
  try {
    const result = await authApi.login(values.username, values.password)
    // setAuth({
    //   accessToken: result.accessToken,
    //   refreshToken: result.refreshToken,
    //   user: result.userInfo,
    // })
    // navigate('/dashboard', { replace: true })
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '登录失败')
  } finally {
    setLoading(false)
  }
  ```

  ```
**没写路由 → 应该返回 404；502 是代理连不上后端服务**。
你这里是 vite/nginx 代理去连 `127.0.0.1:3000`，**后端服务根本没启动、端口没监听，连接被拒绝**，代理拿不到任何响应，就返回 502。

## 后端准备
- docker compose up -d 
  PostgreSQL 容器启动 + 初始化
  PostgreSQL 官方镜像约定——容器首次启动时（数据目录为空），会自动执行挂载到
  /docker-entrypoint-initdb.d 目录下的所有 .sql/.sh 文件。

  所以 init-scripts/postgresql/init.sql
  里的建表语句，就是靠这个目录挂载被自动跑起来的。

  init.sql 里做了三件事：
  建表
  预置种子数据
  用 INSERT ... ON CONFLICT (id) DO NOTHING
     写入角色、测试账号（admin/reviewer/user，密码都是 123456 的 bcrypt 哈希）、权限树、团队。
  所有主键都用 BIGINT（雪花 ID），时间字段 DEFAULT NOW()，普遍带 deleted 软删除标记。

  MongoDB 是面向文档的 NoSQL 数据库，以 BSON 文档存储数据，适合存储结构灵活、大块文本类数据。

  MongoDB 仅存文档正文。document_content 集合存文档解析后的全文内容，通过 content_id 与 PostgreSQL 中
  kh_document 表关联，正文与元数据分离存储。

  正文是大文本（Markdown，可能几 KB 到几 MB），不适合放 PG 这张「高频查元数据」的表里。

  具体拆开：

  1. 查询模式不同，避免拖慢元数据
     kh_document 表承载的是列表、筛选、分页、排序这类频繁小字段查询。若把几 MB 的正文塞进同一行，每次
     SELECT 列表（哪怕只取标题）也会把大字段带进内存/磁盘页，拖慢全表。正文和元数据分离，列表查询就轻了。
  2. 数据类型天然不同
     - 元数据是结构化、关系强的（作者、团队、权限、状态、外键），PG 关系型 + JOIN + 事务最合适。
     - 正文是半结构化大文本（解析出的 Markdown），没有关系运算需求，就是「按 id 读/写一整块」，Mongo
       的文档模型（_id 定位一条）正合适。
  3. 扩展性
     正文会随解析/版本迭代变化，甚至想换存储（对象存储、别的库）时，只动 document_content，不影响 PG
     里的业务表。
  4. 关联方式简单
     一条 PG 行 ↔ 一条 Mongo 文档：
     - kh_document.content_id（varchar）↔ Mongo 的 _id（ObjectId）
     - document_content.documentId ↔ kh_document.id

  一句话：PG 管「这个文档是谁的、什么状态」，Mongo 
  管「这个文档写了什么」——元数据小字段高频查，正文大文本低频整块读，各用各擅长的库。

### psql 查看表和seeds
http://localhost:8088/login?next=/browser/
账号：admin@admin.com
密码：admin
注册服务器
常规 postgres
主机名 postgres  填service 名字
user  123456

查看数据 所有行 

.gitignore 
volumes/




## 登录接口
```js
// 开启cors 
app.enableCors({
    origin: true,
    credentials: true,
});
// 开启全局验证管道 请求不通过验证会抛出异常
app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
);
```
```js
pnpm i @nestjs/config
ConfigModule.forRoot({ isGlobal: true }),
```
nest g res auth
```js
import { 
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return {
      
    }
  }
}

```js
pnpm i class-validator@^0.15.1
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/** 登录 */
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
```

## 登录后端实现
```ts
return this.authService.login(dto);
```
```ts
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { AuthUser } from './auth-user.interface';

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  userInfo: AuthUser;
}

@Injectable()
export class AuthService {
  async login(dto: LoginDto): Promise<LoginResult> {
    return {
      accessToken: '123456',
      refreshToken: '123456',
      tokenType: 'Bearer',
      expiresIn: 3600,
      userInfo: {
        userId: '123456',
        username: 'guang',
        realName: '王光',
        email: 'guang@example.com',
        avatar: 'https://example.com/avatar.jpg',
        roles: ['admin'],
        permissions: ['admin'],
        teamIds: ['123456'],
      },
    }
```
```ts
/** JWT 校验后注入到 Controller 的当前用户 */
export interface AuthUser {
  userId: string;
  username: string;
  realName?: string | null;
  email?: string | null;
  avatar?: string | null;
  roles: string[];
  permissions: string[];
  /** 所在团队（含担任负责人的团队），用于文档可见性 */
  teamIds: string[];
}
```
```
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/** 登录 */
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
```

## user 模块
- typeorm 全局配置
```ts
"@nestjs/typeorm": "^11.0.3",
"typeorm": "0.3.27",
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('POSTGRES_HOST', 'localhost'),
        port: config.get<number>('POSTGRES_PORT', 5432),
        username: config.get<string>('POSTGRES_USER', 'user'),
        password: config.get<string>('POSTGRES_PASSWORD', '123456'),
        database: config.get<string>('POSTGRES_DB', 'knowledge_hub'),
        entities: [
          UserEntity
        ],
        synchronize: false,
      }),
    }),
```
## jwt 登录 
### 单token 缺点

单token想让它失效只能等过期，没法主动注销。一旦泄露，黑客能一直用。而且为了安全只能把有效期设很短，用户就得频繁重新登录，体验很差。

### 双token 机制

双 Token 本质是把“身份”和“续期”拆开：Access Token 短效无状态，负责鉴权；Refresh Token 长效存服务端，负责换发新 Access Token。

这样既能秒级注销权限，又不用每次请求都查库，兼顾了安全和性能。

```
用户登录
  │
  ▼
认证服务校验账号密码
  │
  ▼
签发 Access Token（15分钟） + Refresh Token（7天）
  │
  ▼
前端保存：Access Token 放内存，Refresh Token 放 HttpOnly Cookie(XSS 攻击 js 读取localStorage)
  │
  ▼
前端请求业务接口，Header 带 Access Token
  │
  ▼
服务端验签 Access Token
  │
  ├─ 有效 → 返回业务数据
  │
  └─ 过期 → 返回 401
        │
        ▼
前端拦截 401，用 Refresh Token 调刷新接口
        │
        ▼
服务端校验 Refresh Token：是否存在、是否过期、是否绑定当前设备
        │
        ├─ 校验失败 → 要求重新登录
        │
        └─ 校验成功 → 发新 Access Token，并轮换 Refresh Token
              │
              ▼
前端拿到新 Token，重试原请求，用户无感知
```

1. 登录阶段：用户输入账号密码，后端校验通过后，生成一对 Token。Access Token 是 JWT，短效，用来访问业务接口；Refresh Token 通常存 Redis/DB，长效，只用来换新的 Access Token。
2. 正常请求阶段：前端每次请求业务接口时，在 Authorization: Bearer <Access Token> 里带上 Access Token。后端只验签和检查有效期，不用每次都查库，性能很好。
3. Access Token 过期阶段：请求返回 401，前端响应拦截器捕获后，静默调用刷新接口，带上 Refresh Token。用户不会跳出登录页。
4. 刷新阶段：后端校验 Refresh Token 是否有效、是否过期、是否匹配设备指纹。通过后，签发新的 Access Token，并把旧 Refresh Token 作废，生成新的 Refresh Token，这就是 Refresh Token Rotation。
5. 重试阶段：前端保存新 Token，把刚才失败的请求重新发一遍，用户完全无感。 

面试加分点
  Access Token 短效：泄露后攻击窗口小。
  Refresh Token 可撤销：登出、改密码、设备异常时，服务端直接删除或拉黑它。
  Token 轮换：每次刷新后旧 Refresh Token 失效，防止被盗后反复使用。
  并发刷新控制：多个请求同时 401 时，用队列/锁避免重复刷新。

## ORM 
- Entity（实体）：数据库表在代码里的"镜像"，定义 users 表有哪些字段、什么类型。
  typeorm 提供了装饰器来定义实体，比如 @Entity()、@PrimaryGeneratedColumn()、@Column() 等。
- DTO（数据传输对象）：出入接口的"表单校验器"，规定前端能传什么、后端返回什么，挡掉脏数据。
  class-validator 提供了装饰器来校验 DTO，比如 @IsString()、@IsEmail() 等。
  class-transformer 提供了装饰器来转换 DTO，比如 @Type(() => Number)、@Exclude() 等。
  全局配置 ValidationPipe 
  ```ts
  import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  transform: true, // 开启 class-transformer 自动转换（@Type）
  whitelist: true, // 自动剔除 DTO 上没有定义的字段（挡脏数据）
  forbidNonWhitelisted: true, // 出现多余字段直接报错
}));
  ```

- Repository（仓储）：跟数据库对话的"专属服务员"，封装增删改查，你不用手写 SQL。
  - 在 Module 里 `TypeOrmModule.forFeature([User])` 注册实体 → 生成 Repository
  - 在 Service 里通过 `@InjectRepository(User)` 注入 Repository
  - Service 调用 repository 方法（find、findOne、save、update、delete）

- ORM（TypeORM）：把对象操作翻译成 SQL 的"翻译官"，上面三者都靠它落地。

```
前端请求 POST /users  { email, password }
   │
   ▼
【Controller】接收 @Body
   │  触发 ValidationPipe 按 DTO 校验
   ├─ 不合法（邮箱错/密码太短）→ 直接返回 400，根本进不了业务层 ✅
   │
   ▼ 合法，DTO 对象传进 Service
【Service】业务逻辑层
   │  调用 Repository 操作数据
   ▼
【Repository】userRepo.create() + .save()
   │  把 DTO 组装成 User 实体
   ▼
【ORM / TypeORM】实体 → 翻译成 SQL
   │  INSERT INTO users(email,password) VALUES(...)
   ▼
【数据库 users 表】真正落库
   │
   ▼ 返回结果原路回传
Service 拿到 User 实体 → Controller 返回 → 响应给前端
```


