// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createTokens, setAuthCookies } from '@/lib/jwt'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // 生成新双 Token
    const { accessToken, refreshToken } = await createTokens(user.id)

    // 更新数据库中的 Refresh Token
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    })

    // 设置 Cookie
    setAuthCookies(accessToken, refreshToken)

    return NextResponse.json({ message: 'Login successful' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}