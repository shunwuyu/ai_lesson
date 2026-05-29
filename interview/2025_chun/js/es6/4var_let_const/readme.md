var、let、const的区别：
1.作用域：var是函数作用域，let和const是块级作用域
2. 变量提升：var存在变量提升且初始值为undefined，let和const也提升但有"暂时性死区"
3.重复声明：var允许重复声明，let和const不允许
4. 全局声明：var在全局声明会成为window属性，let和const不会
5. 修改性：var和let声明的变量可以修改，const声明的常量不可修改（但const对象的属性可修改）

暂时性死区(TDZ)指变量在声明前存在但不可访问的状态。let/const声明的变量从作用域开始到声明语句前的区域内，访问变量会抛出ReferenceError错误。