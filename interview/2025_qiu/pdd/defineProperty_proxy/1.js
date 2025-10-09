/**
 * 请实现这个函数，使下面的代码逻辑正常运行
 * @param {*} obj 对象
 * @param {*} callback 回调函数
 */
function observe(obj, callback) {
  const newObj = {}
  Object.keys(obj).forEach(key => {
    Object.defineProperty(newObj, key, {
      configurable: true,
      enumerable: true,
      get() {
        return obj[key]
      },
      // 当属性的值被修改时，会调用set，这时候就可以在set里面调用回调函数
      set(newVal) {
        obj[key] = newVal
        callback(key, newVal)
      }
    })
  })
  return newObj
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
