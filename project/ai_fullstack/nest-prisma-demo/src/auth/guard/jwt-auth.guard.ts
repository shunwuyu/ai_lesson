import { Injectable } from '@nestjs/common';
// npm install @nestjs/passport passport
// npm install @nestjs/jwt passport-jwt
// npm install -D @types/passport-jwt 
// @nestjs/jwt：NestJS 对 JWT 相关功能的封装，方便你在 NestJS 中快速生成、解析、验证 JWT 令牌
// passport：Node.js 生态中通用的身份验证核心工具（底层核心），提供了统一的身份验证流程规范，
// 各种验证方式（JWT、账号密码等）都基于它实现。
// @nestjs/passport：NestJS 框架和 Passport 身份验证工具之间的「衔接桥梁」，
// 让你能以 NestJS 风格使用 Passport 实现各种身份验证。
// Passport 的 JWT 专用策略包，实现了「基于 JWT 令牌进行身份验证」的具体逻辑，
// 让 Passport 知道如何处理 JWT 类型的验证请求。
// passport-jwt：Passport 的 JWT 专用策略包，实现了「基于 JWT 令牌进行身份验证」
// 的具体逻辑，让 Passport 知道如何处理 JWT 类型的验证请求。
import { AuthGuard } from '@nestjs/passport';
// 不携带token 或者token过期了 401 
// 可以被依赖注入
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// Guard 看起来空无一物，其实是通过「继承 + 框架约定 + 策略注册」的方式，自动关联并调用了
// 你提前配置好的 JWT 策略，从而完成令牌校验和 user 对象解析。
// - extends AuthGuard('jwt') 的关键作用 —— 指定「策略名称」
// 这个 JwtAuthGuard 能正常工作，必须提前在 NestJS 中注册了「JWT 验证策略」
// （通常是一个继承 PassportStrategy 的类），
// PassportStrategy(Strategy) 底层会默认把「JWT 策略」的名称注册为 'jwt'
// 当你创建的 JwtAuthGuard 拦截到请求时，会带着 'jwt' 这个标识，去 NestJS 容器中「查找对应的已注册策略」
// （也就是你上面写的 JwtStrategy）。
// 简单说：'jwt' 就是 Guard 和 Strategy 之间的「暗号」，通过这个暗号，Guard 就能找到对应的策略。
// Guard 自动触发「Passport 验证流程」
// 第一步：从请求中提取 JWT 令牌（按照你在 JwtStrategy 中配置的 fromAuthHeaderAsBearerToken() 方式）。
// 第二步：用 secretOrKey 校验令牌的合法性（是否被篡改）和有效性（是否过期）。
// 如果令牌不存在 / 被篡改 / 已过期，直接终止流程，返回 401 未授权。
// 如果令牌合法有效，进入下一步。
// 第三步：自动调用你在 JwtStrategy 中写的 validate() 方法，把解密后的 payload 传给这个方法。
// 第四步：validate() 方法的返回值，会被 Passport 自动挂载到 req.user 上（后续你在控制器中可以直接通过
//  @Req() 装饰器获取 req.user，就是这个返回值）。
// 第五步：验证流程全部通过，放行请求，让请求进入对应的接口处理逻辑。
// @Injectable() 保证 Guard 能「访问到」已注册的策略