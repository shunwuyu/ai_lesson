import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, createTokens } from '../../../../lib/jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get('refresh_token')?.value
    const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/dashboard'

    if (!refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 验证 Refresh Token
    const refreshPayload = await verifyToken(refreshToken)
    if (!refreshPayload || !refreshPayload.userId) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const userId = refreshPayload.userId as number

    // 验证 Refresh Token 是否与数据库一致
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || user.refreshToken !== refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 生成新 Token
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = 
      await createTokens(userId)

    // 更新数据库中的 Refresh Token
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: newRefreshToken },
    })

    // 设置新的 Cookie
    const response = NextResponse.redirect(new URL(redirectUrl, request.url))
    
    // 在API路由中直接设置cookie
    response.cookies.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 15, // 15分钟
      sameSite: 'strict',
      path: '/',
    })
    
    response.cookies.set('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7天
      sameSite: 'strict',
      path: '/',
    })
    
    return response

  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
} 