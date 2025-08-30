import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { generateTokens } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const { accessToken, refreshToken } = generateTokens(user.id)

  return NextResponse.json({
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email },
  })
}
