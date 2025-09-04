import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAccessToken } from "@/lib/auth"

// 需要鉴权的路径
const protectedRoutes = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 只保护指定路由
  if (protectedRoutes.some(r => pathname.startsWith(r))) {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = verifyAccessToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 })
    }
  }
  return NextResponse.next()
}
