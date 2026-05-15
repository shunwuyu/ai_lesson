// JavaScript 的 Proxy 本质就是代理模式的实现。
const user = {
    name: 'Andrew',
    age: 20
  }
  
  const proxy = new Proxy(user, {
    get(target, key) {
      console.log(`读取了 ${key}`)
  
      return target[key]
    },
  
    set(target, key, value) {
      console.log(`修改了 ${key}`)
  
      target[key] = value
  
      return true
    }
  })
  
  console.log(proxy.name)
  
  proxy.age = 30