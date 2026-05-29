# API 文档

订单服务 API 接口文档

## 基本信息

- **Base URL**: `http://localhost:3000`
- **框架**: Express.js
- **认证**: 暂无

---

## 端点列表

| 端点 | 方法 | 描述 |
|------|------|------|
| `/` | GET | 首页欢迎信息 |
| `/hello` | GET | Hello World 测试端点 |
| `/users/:id` | GET | 根据 ID 获取用户信息 |

---

## 端点详情

### GET /

首页欢迎信息

#### Authentication
None

#### Parameters
无

#### Responses

**200 OK**

返回欢迎消息

```json
"Welcome to the homepage!"
```

#### Example

**Request**:
```bash
curl -X GET 'http://localhost:3000/'
```

**Response**:
```json
"Welcome to the homepage!"
```

---

### GET /hello

Hello World 测试端点

#### Authentication
None

#### Parameters
无

#### Responses

**200 OK**

返回 Hello World 消息

```json
"Hello, world!"
```

#### Example

**Request**:
```bash
curl -X GET 'http://localhost:3000/hello'
```

**Response**:
```json
"Hello, world!"
```

---

### GET /users/:id

根据 ID 获取用户信息

#### Authentication
None

#### Parameters

| Name | Location | Type | Required | Description |
|------|----------|------|----------|-------------|
| id | path | string | Yes | 用户唯一标识符 |

#### Responses

**200 OK**

成功返回用户信息

```json
{
  "id": "string",
  "name": "string",
  "email": "string"
}
```

**404 Not Found**

用户不存在

```json
{
  "error": "User not found"
}
```

#### Example

**Request**:
```bash
curl -X GET 'http://localhost:3000/users/123' \
  -H 'Content-Type: application/json'
```

**Response** (Success):
```json
{
  "id": "123",
  "name": "张三",
  "email": "zhangsan@example.com"
}
```

**Response** (Not Found):
```json
{
  "error": "User not found"
}
```

#### Notes
- 该端点使用了 `User.findById()` 方法查询数据库
- 需要确保数据库连接正常
- 用户 ID 格式需要符合数据库规范

---

## 错误码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 404 | 资源未找到 |
| 500 | 服务器内部错误 |

---

## 附录

### 数据模型

#### User
```typescript
interface User {
  id: string;        // 用户唯一标识
  name: string;      // 用户姓名
  email: string;     // 用户邮箱
}
```

### 注意事项
1. 所有响应均为 JSON 格式
2. 时间格式使用 ISO 8601 标准
3. ID 字段通常为 MongoDB ObjectId 或 UUID 字符串
