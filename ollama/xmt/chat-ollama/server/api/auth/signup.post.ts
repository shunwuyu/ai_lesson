import prisma from "@/server/utils/prisma"
import bcrypt from "bcrypt"
// 权限
export enum Role {
  USER = 0,
  ADMIN = 1,
  SUPERADMIN = 2
}


const signUp = async (name: string, email: string, password: string) => {
  console.log(name, password,'/////')
  if (!name || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and password cannot be empty'
    })
  }
  const exist = await prisma.user.count({ where: { name: name } }) > 0

  if (exist) {
    throw createError({
      statusCode: 409,
      statusMessage: `User ${name} already exist`
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: process.env.SUPER_ADMIN_NAME === name ? Role.SUPERADMIN : Role.USER
    }
  })
}

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)
  console.log(name, email, password)
  try {
    // ?. 是可选链操作符，用于安全地访问嵌套对象属性，如果某
    //个属性不存在，则返回 undefined 而不会抛出错误
    const result = await signUp(name, email, password)
    return {
      status: "success",
      user: {
        id: result?.id
      }
    }
  } catch(error) {
    throw error
  }
})