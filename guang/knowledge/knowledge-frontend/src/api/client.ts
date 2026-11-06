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