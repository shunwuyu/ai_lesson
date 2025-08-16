import { NextResponse, NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const PROTECTED = ['/dashboard']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PROTECTED.some(p => pathname.startsWith(p))) {
    const token = req.cookies.get('auth_token')?.value
    console.log(token, '//////////-9    ibovnnklirfioiiriiu')
    const secret = process.env.JWT_SECRET
    if (!token || !secret) {
      const url = new URL('/login', req.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
    try {
      verify(token, secret)
    } catch {
      const url = new URL('/login', req.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }