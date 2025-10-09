function observe(obj, callback) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      callback(key, value)
    }
  })
}

const obj = observe(
  {
    name: '子君',
    sex: '男'
  },
  (key, value) => {
    console.log(`属性[${key}]的值被修改为[${value}]`)
  }
)

// 这段代码执行后，输出 属性[name]的值被修改为[妹纸]
obj.name = '妹纸'

// 这段代码执行后，输出 属性[sex]的值被修改为[女]
obj.name = '女'
// 
obj.gzh = '前端有的玩'
// 使用Object.defineProperty无法监听到新增属性，但是使用Proxy是可以监听到的。对比上面两段代码可以发现有以下几点不同

// Object.defineProperty监听的是对象的每一个属性，而Proxy监听的是对象自身
// 使用Object.defineProperty需要遍历对象的每一个属性，对于性能会有一定的影响
// Proxy对新增的属性也能监听到，但Object.defineProperty无法监听到。
