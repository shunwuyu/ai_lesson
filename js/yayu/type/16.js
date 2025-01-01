// 1.处理基本类型时，与使用toString基本相同，结果都是字符串，除了 undefined
console.log(JSON.stringify(null)) // null
console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true)) // true
console.log(JSON.stringify(42)) // 42
console.log(JSON.stringify("42")) // "42"

// 2.布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); // "[1,"false",false]"

// 3.undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// "{}"

JSON.stringify([undefined, Object, Symbol("")]);  

// 如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};
JSON.stringify(obj);      // '"bar"'
JSON.stringify({x: obj}); 


