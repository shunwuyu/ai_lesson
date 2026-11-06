import { post } from './client'
import type {
  LoginResult
} from '../types'

export const authApi = {
  login: (username: string, password: string) =>
    post<LoginResult>('/auth/login', { username, password }),
}