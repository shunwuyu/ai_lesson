// utils/storage.ts
// T 是泛型参数，表示函数可接受任意类型，并确保返回值与 defaultValue 类型一致。
export function getStorage<T>(key: string, defaultValue: T): T {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : defaultValue
}

export function setStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}
