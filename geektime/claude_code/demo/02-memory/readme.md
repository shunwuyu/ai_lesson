# 项目：电商平台前端

![Claude Code记忆系统与CLAUDE.md](https://time.geekbang.org/column/article/942948)

- 和 AI 协作，不知道你有没有这样的经历。

```
第一次对话：
你：帮我写一个用户登录接口
Claude：好的，这是一个基础的登录接口...（使用 Express + JavaScript）

你：我们项目用的是 nestjs
Claude：好的，让我重新写...

第二次对话：
你：帮我写一个订单创建接口
Claude：好的，这是一个基础的订单接口...（又用 Express + JavaScript）

你：（崩溃）我们用 nestjs!
```

新手使用时， 这种情况经常出现。
如果每次新对话，Claude 都让我从零开始，如果它不记得你的项目用什么技术栈、什么代码风格、什么团队规范——那这种“失忆症”让人抓狂。
- 怎么解决？

![](https://static001.geekbang.org/resource/image/42/6b/42e4743df41a306cc58379f5bd41bb6b.jpg?wh=4266x2582)

CLAUDE.md 就是治疗这种失忆症的药。

它是一份给 Claude 的“项目入职手册”——Claude 每次开始对话时，都会自动阅读这份手册，了解你的项目背景，明确它在干活时应该遵循的一系列底层规则。


## Claude Code 记忆系统的工作原理

![](https://static001.geekbang.org/resource/image/d1/c0/d1a847a91839b94cdd4dc7aac5fdacc0.jpg?wh=2548x1574)

当你在项目目录启动 Claude Code 时，发生的“记忆系统初始化”过程如下


这就像你给新员工一份入职手册，他读完之后就知道公司的规矩。不同的是，Claude 每次对话都会重新“入职”——所以这份手册必须简洁有效。

![](https://static001.geekbang.org/resource/image/2b/2a/2b3ab9a326f6816e32280d6d3801882a.jpg?wh=4109x1892)

把“每次都需要”的内容放CLAUDE.md，把“偶尔需要”的内容放到 Skills 或文档里。

## Claude Code 的五层记忆架构

Claude Code 支持五个层级的记忆，就像洋葱一样，从外到内，按层级结构组织

![](https://static001.geekbang.org/resource/image/77/35/77cc990d2b8c5d906e82e9abd17c3835.jpg?wh=4108x1868)

![](https://static001.geekbang.org/resource/image/02/55/02bb1bd6ba02853c3f314f66d54f8155.jpg?wh=5827x3096)

### 企业策略级记忆设定

企业策略级记忆设定的作用是组织范围内的指令，由 IT/DevOps 统一管理和部署组织。、、、
适合内容是，公司编码标准、安全策略、合规要求以及禁止使用的库或模式。

位置：
macOS: /Library/Application Support/ClaudeCode/CLAUDE.md
Linux: /etc/claude-code/CLAUDE.md
Windows: C:\Program Files\ClaudeCode\CLAUDE.md

示例：

```
# 公司开发策略

## 安全要求
- 禁止在代码中硬编码任何密钥或敏感信息
- 所有 API 调用必须使用 HTTPS
- 用户输入必须经过验证和清理

## 合规要求
- 所有日志必须排除 PII（个人身份信息）
- 数据库连接必须使用加密传输

## 禁止项
- 禁止使用未经审批的第三方库
- 禁止直接访问生产数据库
```
如果你是个人或小团队，可以直接跳过企业级设定这一层。

### 用户级内容设定
用户级内容设定承载的是你的全局偏好，即跨所有项目生效的个人偏好，如个人代码风格，沟通语言设置，通用工作习惯等。
位置：~/.claude/CLAUDE.md

```
# 个人偏好

## 沟通方式
- 使用中文回复
- 代码注释使用英文
- 解释简洁直接，不要过多铺垫

## 通用代码风格
- 缩进使用 2 空格
- 优先使用 async/await
- 变量命名使用 camelCase
- 常量命名使用 UPPER_SNAKE_CASE

## 我的常用工具
- 包管理器: pnpm
- 编辑器: VS Code
- 终端: zsh
```
用户级记忆会被项目级覆盖。如果你个人喜欢 2 空格缩进，但项目要求 4 空格，那就用 4 空格。

### 项目级团队共享规范

团队共享规范是团队共享的项目知识，应该提交到 Git。适合存放的内容包括项目架构和技术栈、团队编码规范、重要的设计决策和常用命令。

位置：项目根目录的  ./CLAUDE.md

示例（一个后端 API 项目）：

```
# 项目：订单服务 API

## 技术栈
- Node.js 20 + TypeScript
- Fastify（Web 框架）
- Prisma（ORM）
- PostgreSQL + Redis
- Zod（数据验证）

## 目录结构
src/ 
├── routes/ # 路由定义 
├── controllers/ # 请求处理 
├── services/ # 业务逻辑 
├── repositories/ # 数据访问 
├── schemas/ # Zod schemas 
└── types/ # 类型定义

## API 响应格式
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string };
}
编码规范
- TypeScript strict 模式
- 禁止使用 any，使用 unknown + 类型守卫
- 所有 API 端点必须有 Zod schema 验证
- 业务错误使用自定义 Error 类
常用命令
- pnpm dev - 启动开发服务器
- pnpm test - 运行测试
- pnpm prisma migrate dev - 运行数据库迁移
```
### 本地级个人工作空间

个人工作空间用于记载个人工作笔记，不提交到 Git，适合内容包括本地环境配置、个人调试技巧、当前工作备注，敏感信息（测试账号等）。

位置：项目根目录的./CLAUDE.local.md

```
# 本地开发笔记

## 我的环境
- 本地 API: http://localhost:3000
- 测试数据库: order_service_dev
- Redis: localhost:6379

## 测试账号
- admin@test.com / test123
- user@test.com / test123

## 当前工作
- 正在重构支付模块
- 参考 PR #234 的讨论
- 周五前完成

## 调试技巧
- 订单状态机日志: LOG_LEVEL=debug pnpm dev
- 查看 Redis 缓存: redis-cli KEYS "order:*"
```

这里重点强调一下：记得把  CLAUDE.local.md  加入  .gitignore！

### 规则目录：分类组织
Rules 是按主题组织的规则文件，支持条件作用域（也就是视情况来确定是否加载该记忆内容）

位置：.claude/rules/*.md

目录结构：

```
.claude/
└── rules/
    ├── typescript.md      # TypeScript 规范
    ├── testing.md         # 测试规范
    ├── api-design.md      # API 设计规范
    └── security.md        # 安全规范
```

## 编写高效的 CLAUDE.md

如果你只能记住一句话，那就是 CLAUDE.md 写得好不好，直接决定了 Claude 是靠谱同事，还是每次都要重新培训的实习生。

下面我们就来讨论 CLAUDE.md 编写要遵循的核心原则，了解怎么写，才值得每次都被加载进上下文。

### 核心原则 1：Less is More

CLAUDE.md 的每一行，都会在每一次对话开始时被自动注入上下文。这意味着一件事：冗余不是无害的，而是持续消耗的。所以保持精简不是建议，而是必须。

### 核心原则 2：具体优于泛泛

``` 
错误的提示
# 项目规范
## 代码质量
请写出高质量的代码。代码应该是可读的。使用有意义的变量名。
保持代码整洁。遵循最佳实践。不要写重复的代码。
```

```
优秀
# 项目规范

## TypeScript
- 使用 `interface` 定义对象结构，`type` 用于联合类型
- 禁止 `any`，使用 `unknown` + 类型守卫
- 函数参数 > 3 个时，使用对象参数

## 错误处理
```typescript
// 业务错误
throw new BusinessError('ORDER_NOT_FOUND', '订单不存在');

// 验证错误（Zod 自动抛出）
const data = orderSchema.parse(input);

// controller 中不要 try-catch
// 由全局错误中间件统一处理
```

两者的差异非常明确。后者不是模糊要求“要高质量”，而是给出了如何做才算高质量；不是“注意错误处理”，而是具体的错误模型；不是抽象描述，而是可直接模仿的代码形态。

这里有个简单的判断标准——如果你不写，Claude 也大概率会做对，那就不要写。

### 核心原则 3：关键三问题 WHY / WHAT / HOW

一份真正“能用”的 CLAUDE.md，通常都在回答三个问题。不是一次性回答，而是在关键地方给出明确指引。

### WHY —— 为什么要这样做？

```
## 为什么使用 Zod？
- TypeScript 只有编译时类型检查
- API 输入需要运行时验证
- Zod 可以同时生成 TS 类型和验证逻辑
- 错误信息自动生成，对用户友好
```

这一部分的作用，不是让 Claude “记住一个库”，而是让它理解背后的决策逻辑。当 Claude 明白了为什么，它在面对相似但不完全相同的场景时，才更可能做出一致的判断。

### WHAT —— 具体要做什么，不要做什么？

```
## 数据库操作规范
- 所有查询通过 Prisma ORM
- 复杂查询封装在 `src/repositories/`
- 禁止在 controller/service 中直接写 SQL
- 事务使用 `prisma.$transaction()`
```

这一部分的重点是边界。什么是允许的，什么是禁止的，决策应该发生在哪一层？对 Claude 来说，这比“最佳实践”四个字重要得多。

### HOW —— 按什么步骤去做？

```
## 创建新 API 端点

1. 在 `src/schemas/` 创建请求/响应 Zod schema
2. 在 `src/routes/` 添加路由定义
3. 在 `src/controllers/` 实现请求处理
4. 在 `src/services/` 实现业务逻辑
5. 在 `tests/` 添加测试用例

示例参考: `src/routes/orders.ts`
```

### 核心原则 4：渐进式披露：不要把一切都塞进 CLAUDE.md
CLAUDE.md 的职责是定义默认决策，而不是承载全部知识。对于非核心、但可能被用到的内容，正确的做法是引用，而不是复制。

```
# 项目规范

## 核心
[精简的核心规范]

## 详细文档
- 数据库设计: 见 `docs/database.md`
- API 规范: 见 `docs/api-spec.md`
- 部署流程: 见 `docs/deployment.md`
```

## CLAUDE.md 实战演练

### 场景一：为新项目创建记忆

npm init vite mall



## 技术栈
- React 18 + TypeScript
- Vite 构建
- TanStack Query（数据获取）
- Zustand（状态管理）
- Tailwind CSS

## 目录结构
src/ 
├── components/ # 组件 
│ ├── ui/ # 基础 UI 
│ └── features/ # 功能组件 
├── pages/ # 页面 
├── hooks/ # 自定义 Hooks 
├── stores/ # Zustand stores 
├── api/ # API 调用 
└── types/ # 类型定义

## 组件规范
- 函数组件 + Hooks
- Props 接口命名: `XxxProps`
- 一个组件一个目录: `Button/index.tsx`

## 状态管理
- 服务端状态: TanStack Query
- 客户端状态: Zustand
- 本地状态: useState

## 常用命令
- `pnpm dev` - 开发服务器
- `pnpm build` - 构建
- `pnpm test` - 测试