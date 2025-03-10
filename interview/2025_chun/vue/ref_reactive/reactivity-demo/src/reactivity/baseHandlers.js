import { track, trigger } from "./effect"
import { isObject } from "../shared"

const get = createGetter()
const set = createSetter()

function createGetter(shallow = false) {
  return function get(target, key, receiver) {
    // 用于获取对象上指定属性的值
    const res = Reflect.get(target, key, receiver)
    track(target, "get", key)
    if (isObject(res)) {
      return shallow ? res : reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, "set", key)
    return result
  }
}


export const mutableHandlers = {
  get,
  set,
  // has,
  // deleteProperty
}