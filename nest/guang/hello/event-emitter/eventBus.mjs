// eventBus.mjs
export class EventBus {
  constructor() {
    this.eventMap = {}
  }

  on(eventName, fn) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = []
    }
    this.eventMap[eventName].push(fn)
  }

  emit(eventName, ...args) {
    const fns = this.eventMap[eventName] ?? []
    fns.forEach(fn => fn(...args))
  }

  off(eventName, fn) {
    if (!this.eventMap[eventName]) return
    this.eventMap[eventName] = this.eventMap[eventName].filter(item => item !== fn)
  }
}
