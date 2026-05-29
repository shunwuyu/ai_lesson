<!-- 请你实现一个 observe 函数，能够对对象的属性进行监听。当对象的任意属性值发生变化时，
触发回调函数并传入被修改的属性名和新值。请注意，修改后的对象仍需保持正常读写能力。 -->
function observe(obj, callback) {}

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
obj.sex = '女'
