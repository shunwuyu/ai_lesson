// react 18 新增hook, 
import { useSyncExternalStore } from 'react'
import type { AuthUser } from './types'

const ACCESS_KEY = 'kh_access_token'
const REFRESH_KEY = 'kh_refresh_token'
const USER_KEY = 'kh_user'

let currentUser: AuthUser | null = loadUser()

const listeners = new Set<() => void>()


function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY)
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(USER_KEY)
  currentUser = null
  emit()
}

function emit() {
}

export function subscribeAuth(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getUser() {
  return currentUser
}

export function useAuth() {
  return useSyncExternalStore(subscribeAuth, getUser)
}


export function setAuth(params: {
  accessToken: string
  refreshToken: string
  user: AuthUser
}) {
  localStorage.setItem(ACCESS_KEY, params.accessToken)
  localStorage.setItem(REFRESH_KEY, params.refreshToken)
  localStorage.setItem(USER_KEY, JSON.stringify(params.user))
  currentUser = params.user
  emit()
}