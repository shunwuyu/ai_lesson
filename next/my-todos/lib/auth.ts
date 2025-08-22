import jwt from "jsonwebtoken"

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret"
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_secret"

// 生成 access + refresh token
export const generateTokens = (userId: number) => {
  const accessToken = jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "15m" })
  const refreshToken = jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: "7d" })
  return { accessToken, refreshToken }
}

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as { userId: number }
  } catch {
    return null
  }
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as { userId: number }
  } catch {
    return null
  }
}
