export interface AuthUser {
  userId: string
  username: string
  realName?: string | null
  email?: string | null
  avatar?: string | null
  roles: string[]
  permissions: string[]
  teamIds?: string[]
}

export interface LoginResult {
  accessToken: string
  refreshToken: string
  tokenType: 'Bearer'
  expiresIn: number
  userInfo: AuthUser
}

