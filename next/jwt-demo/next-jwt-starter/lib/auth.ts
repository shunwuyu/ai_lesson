import { cookies } from 'next/headers'
import { verifyJwt, type JwtPayload } from './jwt'

const COOKIE_NAME = 'auth_token'

export function setAuthCookie(token: string) {
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME)
}

export function getUserFromCookie(): JwtPayload | null {
  const token = cookies().get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyJwt(token)
}