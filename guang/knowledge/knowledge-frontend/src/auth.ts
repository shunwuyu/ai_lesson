// react 18 新增hook, 
// import { useSyncExternalStore } from 'react'

const ACCESS_KEY = 'kh_access_token'
const REFRESH_KEY = 'kh_refresh_token'
const USER_KEY = 'kh_user'

let currentUser;

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

export function useAuth() {
  return null
  // return useSyncExternalStore(subscribeAuth, getUser)
}