import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { promises as fs } from "fs"
import path from "path"

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 读取 data/posts.json 文件
    const dataPath = path.join(process.cwd(), "data", "posts.json")
    const fileContent = await fs.readFile(dataPath, "utf-8")
    const data = JSON.parse(fileContent)
    
    if (!data.posts || !Array.isArray(data.posts)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      )
    }

    const posts = data.posts
    
    
    // 循环插入 posts 数据
    for (const post of posts) {
      try {
       
        const createdPost = await prisma.post.create({
          data: {
            title: post.title,
            content: post.content,
            userId: Math.floor(Math.random() * 10) + 1
          }
        })
        
        
      } catch (error) {
        console.error(`Failed to insert post "${post.title}":`, error)
      }
    }
    
    // 统计结果
    
    return NextResponse.json({
      message: `Posts import completed. `,
      total: posts.length,
      
    })
    
  } catch (error) {
    console.error("Error importing posts:", error)
    return NextResponse.json(
      { 
        error: "Failed to import posts",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}