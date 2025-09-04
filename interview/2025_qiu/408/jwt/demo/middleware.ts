// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

// 需要鉴权的路径
const protectedPaths = ['/dashboard', '/profile']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log(path, '///////');
  
  // 非保护路径直接放行
  if (!protectedPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get('access_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value

  // 无 Token，重定向到登录
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 验证 Access Token
  if (accessToken) {
    const accessPayload = await verifyToken(accessToken)
    console.log(accessPayload, '----')
    if (accessPayload) {
      // Access Token 有效，附加用户信息到请求头
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', accessPayload.userId as string)
      return NextResponse.next({
        request: { headers: requestHeaders },
      })
    }
  }

  // Access Token 无效或过期，尝试用 Refresh Token 刷新
  if (refreshToken) {
    const refreshPayload = await verifyToken(refreshToken)
    console.log(refreshPayload, '????')
    if (refreshPayload) {
      // 在middleware中，我们只验证refresh token的有效性
      // 具体的token刷新逻辑应该在API路由中处理
      const userId = refreshPayload.userId as number
      
      // 重定向到刷新API，让API路由处理token刷新
      const refreshUrl = new URL('/api/auth/refresh', request.url)
      refreshUrl.searchParams.set('redirect', request.url)
      return NextResponse.redirect(refreshUrl)
    }
  }

  // 所有token都无效，清除 Cookie 并重定向到登录
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('access_token')
  response.cookies.delete('refresh_token')
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // 指定中间件作用路径
}