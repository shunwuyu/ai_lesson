import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyAccessToken } from "@/lib/auth"

const prisma = new PrismaClient()

// Create Post
// export async function POST(req: Request) {
//   const authHeader = req.headers.get("authorization")
//   const token = authHeader?.split(" ")[1]
//   const payload = token && verifyAccessToken(token)

//   if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

//   const { title, content } = await req.json()
//   const post = await prisma.post.create({
//     data: { title, content, userId: payload.userId },
//   })
//   return NextResponse.json(post)
// }

// Read all posts
export async function GET() {
  const posts = await prisma.post.findMany({
    include: { user: { select: { id: true, email: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(posts)
}
