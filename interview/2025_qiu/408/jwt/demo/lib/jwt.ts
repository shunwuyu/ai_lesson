// lib/jwt.ts
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY
  if (!secret) throw new Error('JWT_SECRET_KEY is not set')
  return new TextEncoder().encode(secret)
}

export const createTokens = async (userId: number) => {
    // Access Token：用于访问受保护的资源（API 接口），是“干活的钥匙”。
    // Refresh Token：仅用于在 Access Token 过期后，换取一个新的
    //  Access Token（和 Refresh Token），是“换钥匙的钥匙”。
  // Access Token (短时效)
  const accessToken = await new SignJWT({ userId }) 
    // 1. 创建 JWT 载荷 (payload)，包含用户ID
    .setProtectedHeader({ alg: 'HS256' })
    // 2. 设置头部，指定使用 HS256 算法签名
    .setIssuedAt()
    // 3. 添加签发时间 (iat)
    // 4. 设置过期时间：15分钟后
    // 5. 使用密钥对 JWT 进行签名，生成最终的 Token 字符串
    .sign(getJwtSecretKey())

  // Refresh Token (长时效)
  const refreshToken = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7天
    .sign(getJwtSecretKey())

  return { accessToken, refreshToken }
}

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey())
    return payload
  } catch (error) {
    return null
  }
}

// 设置 HTTP Only Cookie
export const setAuthCookies = async (accessToken: string, refreshToken: string) => {
    // cookies() 是 Next.js App Router 内置的函数。
  const cookieStore = await cookies()
  
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 15, // 15分钟 (修复：60 * 0.1 应该是 60 * 15)
    sameSite: 'strict',
    path: '/',
  })
  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7天
    sameSite: 'strict',
    path: '/',
  })
}

// 清除 Cookie
export const clearAuthCookies = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
}