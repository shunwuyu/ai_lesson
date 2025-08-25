// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { createTokens, setAuthCookies } from '@/lib/jwt'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // 验证输入
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    // 生成双 Token
    const { accessToken, refreshToken } = await createTokens(user.id)

    // 存储 Refresh Token 到数据库
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    })

    // 设置 Cookie
    setAuthCookies(accessToken, refreshToken)

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}