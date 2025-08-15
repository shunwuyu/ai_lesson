import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!
const EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d'

export type JwtPayload = { sub: string; email: string; username: string; role: string }

export function signJwt(payload: JwtPayload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN })
}

export function verifyJwt<T = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T
  } catch {
    return null
  }
}