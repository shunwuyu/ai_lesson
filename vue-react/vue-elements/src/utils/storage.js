import { watchEffect, ref } from "vue"

export function useStorage(name, value = "") {
  const localValue = localStorage.getItem(name)
  const data = ref(localValue ? JSON.parse(localValue) : "")
  if (value) {
    data.value = value
  }
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value))
  })
  return data
}