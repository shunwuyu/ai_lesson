[认证](https://github.com/m12305/hello-FastAPI/blob/main/%E9%98%B6%E6%AE%B54-%E8%AE%A4%E8%AF%81%E4%B8%8E%E6%8E%88%E6%9D%83/4.1-%E8%AE%A4%E8%AF%81%E5%9F%BA%E7%A1%80.md)

> 从"谁都可以访问"到"先证明你是谁"——掌握密码哈希、HTTP Basic Auth 和 Session 认证的核心原理，为 JWT 学习打下基础。

## 1. 认证 vs 授权：别再搞混了

这是面试必考题，也是实际开发中最容易被混淆的概念：
```
认证（Authentication）  →  你是谁？  →  "请出示身份证"
授权（Authorization）   →  你能做什么？ →  "VIP 可以进，普通用户不行"
```
	认证	授权
英文	Authentication	Authorization
问什么	你是谁？	你能做什么？
常见方式	密码、JWT、OAuth2	RBAC、ACL、权限装饰器
失败响应	401 Unauthorized	403 Forbidden
发生时机	先认证，再授权	认证通过后才检查

JWT 是登录后下发的令牌，前端每次请求带上它。服务端可以解码得到 JSON 信息，不用查 session，就能确认是谁在访问。

Cookie 是服务器发给浏览器、存在本地的一小段文本，之后浏览器访问同网站会自动带上它，用来记住你的状态。

登录时后端生成唯一 sessionId，用户数据存在服务器（比如 Redis），只把 sessionId 放到 cookie 发给浏览器。浏览器每次请求带回 id，后端靠 id 查到你的会话数据。

例子：登录博客，Redis 存 `s1001:{userId:1,name:'张三'}`，cookie 只存`sid=s1001`。后端拿到 sid 去 Redis 查信息。

OAuth2 就是授权协议，比如用微信登录网站，不用把微信密码给网站，只授权它拿你的昵称头像。

比如用微信登录网站：网站先让你跳去微信，你同意授权后微信发授权码给网站；网站拿码换 token，凭 token 就能获取你的头像昵称。全程网站拿不到你的微信密码，只是拿到临时授权凭证访问你的资源。

```
请求到达
    │
    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   认证        │ ──→ │   授权        │ ──→ │   业务逻辑    │
│  你是谁？     │ ✅  │  你能做吗？   │ ✅  │  执行操作     │
└──────────────┘     └──────────────┘     └──────────────┘
    │ 401                  │ 403
    ▼                      ▼
  未登录                 无权限
```
RBAC 就是基于角色的权限控制，给用户分配角色，再给角色绑定权限，不用单独给每个人配置权限。

## 密码处理：绝对不能明文存密码

user = User(username="张三", password="12345678")  # 密码直接存数据库！
db.add(user)

哈希（Hash）——单项加密
```
import hashlib

# 哈希的特点：
# 1. 同样的输入 → 同样的输出（可验证）
# 2. 无法从输出反推输入（单向）
# 3. 微小输入差异 → 完全不同的输出（雪崩效应）


password = "12345678"
hashed = hashlib.sha256(password.encode()).hexdigest()
print(hashed)  # ef797c8118f02dfb...  ← 存这个！

# 验证时：把用户输入的密码再哈希一次，和数据库比对
```

2.3 加盐（Salt）——防止彩虹表攻击
彩虹表是提前算好大量密码哈希对照表，用来快速匹配破解哈希密码。
给每个用户单独生成随机盐，和密码一起哈希。就算密码一样，盐不同，算出的哈希也不一样，彩虹表直接失效。
验证密码的时候， 也能拿到之前的盐吗？ 不然怎么能验证呢？
和哈希值一起存在数据库。登录时取出这条盐，和用户输入密码重新哈希，对比结果。哈希不能解密。
一般单独一个字段存盐

```python
# 内置标准
import hashlib

import os

# ❌ 问题：相同密码 → 相同哈希值
# 用户A: 123456 → abc123
# 用户B: 123456 → abc123  ← 攻击者一看就知道两人密码相同！

# ✅ 加盐：每个用户一个随机盐值
# tuple 就是元组，这里函数返回两个字符串：哈希后的密码、盐，打包成一组返回。
def hash_password(password: str) -> tuple[str, str]:
    # 生成 16 字节的随机二进制数据
    # 7a2f91d48ec0563bc172908e41fa603d
    salt = os.urandom(16).hex()  # 随机盐
    # a256 是一种哈希算法，接收数据，算出固定 256 位的摘要，不可逆，相同输入输出一样。
    # hexdigest把 sha256 算出的二进制哈希摘要，转成 64 位可读十六进制字符串，方便保存对比。
    # sha256 原生是二进制字节，不好存；hexdigest 转成文本字符串，方便入库对比
    hashed = hashlib.sha256((password + salt).encode()).hexdigest()
    return hashed, salt

def verify_password(password: str, hashed: str, salt: str) -> bool:
    return hashlib.sha256((password + salt).encode()).hexdigest() == hashed

# 用户A: 123456 + salt_a → hash_a
# 用户B: 123456 + salt_b → hash_b  ← 完全不同！
```

## 3. HTTP Basic Auth

最原始的 HTTP 认证方式，理解它的原理有助于理解更高级的方案。

## 实战
1. pip install -r requirements.txt
2. main.py
uvicorn main:app 不能加--reload

