// instance 继承
interface a { x: number; y: number }
// 继承 a
// 使用 extends(继承)关键字实现了接口
interface b extends a {
  z: number
}

let obj:b = {
    
}