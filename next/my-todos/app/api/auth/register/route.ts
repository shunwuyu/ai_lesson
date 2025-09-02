import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
//^ 开始  [^\s@]+ @前至少一个非空格非@字符 @ 必须有@ 
// [^\s@]+ @和.之间至少一个字符
// \. 必须有.
// [^\s@]+ .后至少一个字符
// $ 结束
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 密码不能只是简单数字（如 123456、111111），至少包含一个非数字字符
const passwordRegex = /^(?!^\d+$)/;
export async function POST(req: Request) {
  const { email, password } = await req.json()
  // 邮箱格式校验
  if (!email || !emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: '邮箱格式不正确' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 密码长度校验：不少于6位
  if (!password || password.length < 6 || !passwordRegex.test(password)) {
    return new Response(
      JSON.stringify({ error: '密码不少于6位,且不能全为数字' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // 使用bcrypt对密码进行哈希加密，强度为10 不存明文， 单向加密
  const hashed = await bcrypt.hash(password, 10)
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: { email, password: hashed },
  })

  return NextResponse.json({ id: user.id, email: user.email })
} 