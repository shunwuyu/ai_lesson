import { useStorage } from './storage'
export const getToken = () => useStorage('token').value