import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/hash'
import { loginSchema } from '@/lib/validations'
import { signJwt } from '@/lib/jwt'
import { setAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', issues: parsed.error.format() }, { status: 400 })
    }
    const { emailOrUsername, password } = parsed.data

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: emailOrUsername }, { username: emailOrUsername }], isActive: true },
    })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })

    const token = signJwt({ sub: String(user.id), email: user.email, username: user.username, role: user.role })
    setAuthCookie(token)

    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}