let obj = {};

Object.defineProperty(obj, 'visibleProperty', {
    value: 'Visible Value',
    // enumerable: false // 属性可以在迭代中被枚举
    enumerable: true
});

for(let prop in obj) {
    console.log(prop + ': ' + obj[prop]); // 输出: visibleProperty: Visible Value
}