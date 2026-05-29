# 数组扁平化

- 何为扁平化
    扁平化就是将多维数组变成一维数组,不存在数组的嵌套

- 最方便的方式是？
    ES6 flat

- ES6 flat
    flat(depth) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

    depth(可选) 指定要提取嵌套数组的结构深度,默认值为 1

    使用 Infinity，可展开任意深度的嵌套数组
```
 const arr = [1, [2, [3, [4, 5]]], 6]

 function flatten(params) {
   return params.flat(Infinity)
 }
 console.log(flatten(arr));

 // 输出: [1,2,3,4,5,6]

```

- toString
    如果数组的项全为**数字**，可以使用join()，toString()可以利用数组toString() 转为字符串

    ```js
    function flatten(arr) {
  return arr.toString().split(',').map(item =>parseFloat(item))
}
console.log(flatten(arr));
// 输出:[ 1, 2, 3, 4, 5, 6 ]

    ```

- 使用正则替换
    ,如果在字符串的角度上看就是多了很多[ 和],如果把它们替换就可以实现简单的扁平化

- 循环递归
    - 循环 + concat + push
    当只有一层嵌套数组使用push的方式扁平化
    - 如果有多层嵌套的数组就需要使用 递归的思想
        - 循环判断数组的每一项是否是数组: Array.isArray(arr[i])
        - 是数组就递归调用上面的扁平化一层的代码 result = result.concat(flatten(arr[i]));
        - 不是数组,直接通过push添加到返回值数组
    - 增加参数控制扁平化深度
        手写flat方法
    - 巧用 reduce
        reduce 方法为数组中的每个元素按序执行一个reducer函数,每一次运行 reducer 会将先前元素的计算结构作为参数传入,最后将其结果汇总为单个返回值

- 使用堆栈 stack 避免递归
9.js

- while 循环+ some方法


ES6 flat()
优点：简单易用，支持任意深度扁平化。
缺点：依赖内置方法，兼容性。
toString()
优点：实现简单。
缺点：不适用于非数字数组，且不严谨。
正则替换
优点：快速实现。
缺点：依赖字符串处理。
循环递归
优点：直观，易于理解。
缺点：缺乏深度控制。
递归 + 深度控制
优点：灵活，支持深度参数。
缺点：实现复杂。
使用 reduce()
优点：优雅，函数式编程风格。
缺点：可能不易理解。

堆栈实现
优点：避免递归，减少栈溢出风险。
缺点：实现较复杂。
while + some()
优点：有效判断嵌套。
缺点：实现较复杂，性能可能较低。
