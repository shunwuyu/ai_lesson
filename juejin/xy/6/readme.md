# 轻松理解时间复杂度与空间复杂度

- 如何评价算法的好坏？
  - 时间复杂度
  - 空间复杂度

- 下面这段代码，一共会执行多少次
```
function traverse(arr) {
    var len = arr.length // 一次
    for(var i=0;i<len;i++) { // i 的初始化 执行1次  i < len n+1次， 比递增语句多执行一次  i++ 执行n次
        console.log(arr[i]) // n次
    }
}
```
T(n) = 1 + n + 1 + (n+1) + n = 3n + 3

- n*n 的二维数组的遍历，一共需要执行多少次代码
  ```
  function traverse(arr) {
    var outLen = arr.length // 1次

    for(var i=0;i<outLen;i++) { // i = 0 1次 i< outLen n+ 1, i++ n 
        var inLen = arr[i].length // n 次

        for(var j=0;j<inLen;j++) {  // j = 0 n 次 j<inLen n*(n+1)  j++ n*n
            console.log(arr[i][j]) // n*n = n^2
        }
    }
}

  ```

  T(n) = 1 + 1 + (n+1) + n + n + n + n*(n+1) + n*n + n*n = 3n^2 + 5n + 3

  代码的**执行次数**，可以反映出代码的执行时间。但是如果每次我们都逐行去计算 T(n)，事情会变得非常麻烦。

  算法的时间复杂度，它反映的不是算法的逻辑代码到底被执行了多少次，而是随着输入规模的增大，算法对应的执行总次数的一个**变化趋势**。

  要想反映趋势，那就简单多了，直接抓主要矛盾就行。

  - 若 T(n) 是常数，那么无脑简化为1
  - 若 T(n) 是多项式，比如 3n^2 + 5n + 3，我们只保留次数最高那一项，并且将其常数系数无脑改为1。

  经过这么一波操作，T(n) 就被简化为了 O(n)：

  T(n) = 10  
  O(n) = 1

  T(n) = 3n^2 + 5n + 3
  O(n) = n^2

  计算T(n) -> 推导O(n)  O(n) 基本可以目测

  上面两个例子

  规模为 n 的一维数组遍历时，最内层的循环会执行 n 次，其对应的时间复杂度是 O(n)；规模为 n*n 的二维数组遍历时，最内层的循环会执行 n*n 次，其对应的时间复杂度是 O(n^2)。

  规模为 n*m 的二维数组最内层循环会执行 n*m 次，其对应的时间复杂度就是 O(n*m)；规模为 n*n*n 的三维数组最内层循环会执行 n^3 次，因此其对应的时间复杂度就表示为 O(n^3)。

- 另一个算法 时间复杂度多少？ O(logn)
```
function fn(arr) {
    var len = arr.length  
    
    for(var i=1;i<len;i=i*2) {
        console.log(arr[i])
    }
}

```

这个算法读取一个一维数组作为入参，然后对其中的元素进行跳跃式的输出。这个跳跃的规则，就是数组下标从1开始，每次会乘以二。

如何计算这个函数的时间复杂度呢？在有循环的地方，我们关心的永远是最内层的循环体。这个算法中，我们关心的就是 console.log(arr[i]) 到底被执行了几次，换句话说，也就是要知道 i<n（ len === n） 这个条件是在 i 递增多少次后才不成立的。

O(n) = logn 对数表达式。

## 时间复杂度 

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/4/6/1714f67c52dc8d15~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)


## 空间复杂度
空间复杂度是对一个算法在运行过程中临时占用存储空间大小的量度。和时间复杂度相似，它是内存增长的趋势。
常见的空间复杂度有 O(1)、O(n) 和 O(n^2)。

```
function traverse(arr) {
    var len = arr.length
    for(var i=0;i<len;i++) {
        console.log(arr[i])
    }
}
```
arr
len
i 

循环体在执行时，并没有开辟新的内存空间。因此，整个 traverse 函数对内存的占用量是恒定的，它对应的空间复杂度就是 O(1)。

-  ```
function init(n) {
    var arr = []
    for(var i=0;i<n;i++) {
        arr[i] = i
    }
    return arr
}

```

n 
arr
i

arr，它并不是一个一成不变的数组。arr最终的大小是由输入的 n 的大小决定的，它会随着 n 的增大而增大、呈一个线性关系。因此这个算法的空间复杂度就是 O(n)。
