import { watchEffect, ref } from "vue"

export function useStorage(name, value = "") {
  const localValue = localStorage.getItem(name)
  const data = ref(localValue ? JSON.parse(localValue) : "")
  if (value) {
    data.value = value
  }
  // watchEffect 是 Vue.js 中的一个函数，它用于自动追踪响应式依赖，并在依赖发生变化时执行副作用函数。
  // 它会立即执行一次副作用函数，并在之后每次依赖变化时重新执行。
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}