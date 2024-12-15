Object.prototype.toString.call({a: 1}) // 对象的[[class]] [object Object]
console.log(Object.prototype.toString.call([1, 2, 3])) //  
({a: 1}).toString() // 
({a: 1}).toString === Object.prototype.toString
// 我们可以看出当调用对象的 toString 方法时，其实调用的是 Object.prototype 上的 toString 方法。
