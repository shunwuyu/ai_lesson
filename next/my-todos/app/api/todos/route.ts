import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Create
export async function POST(req: Request) {
  const { title } = await req.json()
  const todo = await prisma.todo.create({ data: { title } })
  return NextResponse.json(todo)
}

// Read
export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(todos)
}
