// 效果一模一样。
// 区别是：Reflect.get 这个方法更“官方”、更一致，也能更方便地与 Proxy 配合使用。

const user = { name: '子君' }

// 传统写法
console.log(user.name)

// Reflect 写法
console.log(Reflect.get(user, 'name'))


// 和 Proxy 一起用

// 如果你用 Proxy 拦截对象访问，
// 直接写 target[key] 有时会丢失上下文或原型链行为，
// 这时就该用 Reflect.get。


