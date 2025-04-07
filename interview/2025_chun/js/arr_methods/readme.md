# 数组常用方法

- es6 系列
    map 创建一个新数组，包含通过调用提供的函数处理每个元素后的结果。
    filter 创建一个新数组，包含所有通过测试的元素。
    reduce 对数组中的每个元素执行一个 reducer 函数，最终计算出一个值。
    find 返回数组中满足提供的测试函数的第一个元素，找不到则返回 undefined。
    some 测试数组中是否至少有一个元素通过了测试函数，返回布尔值。
    every 测试数组中的所有元素是否都通过了测试函数，返回布尔值。

- 排序 sort()
    对数组的元素进行排序，默认按字符串 Unicode 编码顺序排序。

- 扁平化 flat
    const nestedArray = [1, [2, 3], [4, [5, 6]]];
const flatArray = nestedArray.flat(2);
console.log(flatArray); 

- includes()
    判断数组是否包含某个值，返回布尔值

- splice()
    通过添加或删除元素来修改数组内容。
    const items = ["apple", "banana", "cherry"];
items.splice(1, 1, "orange"); // 从索引 1 开始删除 1 个元素，并插入 "orange"
console.log(items);

- slice()
    返回数组的一个片段，创建一个新数组。

- forEach()
- concat
- fill 
- reverse


- 会修改原数组的方法
    push(), pop(), shift(), unshift(), splice(), sort(), reverse(), fill().
- 不会修改原数组的方法
    map(), filter(), reduce(), slice(), concat(), flat(), includes(), find(), some(), every().

