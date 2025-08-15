import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/hash'
import { registerSchema } from '@/lib/validations'
import { signJwt } from '@/lib/jwt'
import { setAuthCookie } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', issues: parsed.error.format() }, { status: 400 })
    }
    const { email, username, password } = parsed.data

    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { id: true },
    })
    if (exists) return NextResponse.json({ error: 'Email or username already exists' }, { status: 409 })

    const passwordHash = await hashPassword(password)
    const user = await prisma.user.create({ data: { email, username, passwordHash } })

    const token = signJwt({ sub: String(user.id), email: user.email, username: user.username, role: user.role })
    setAuthCookie(token)

    return NextResponse.json({ id: user.id, email: user.email, username: user.username, role: user.role })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}