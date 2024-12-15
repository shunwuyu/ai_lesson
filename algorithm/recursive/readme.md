[source](https://juejin.cn/post/6844903942074138637?searchId=202412121529104D8E8982D40455021205#heading-4)

- 如何写递归代码
  如何求1+2+3+4+...+n的和？

  1.js

  - 第一步： 写出递归公式 自顶向下
  sum(n) = sum(n-1) + n
  f(n) = f(n-1) + n
  - 
  第二步：找出终止条件
  sum（1）= 1；

  function sum(n) {
    if( n ===1 ) return 1
    return sum(n-1) + n
}

- 如何把数组拍平
  如何把[1, [2], [3, [4, [5]]]]拍平得到[1,2,3,4,5]

  2.js

- 拷贝  3.js

```js
{
  value: 'A',
  children: [
    {
      value: 'B',
      children: [
        {
          value: 'D',
          children: [
            {
              value: 'H',
              children: []
            }
          ]
        },
        {
          value: 'E',
          children: []
        }
      ]
    },
    {
      value: 'C',
      children: [
        {
          value: 'F',
          children: []
        },
        {
          value: 'G',
          children: []
        }
      ]
    }
  ]
}
```

把数据转为二叉树结构

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92934f532864416cad29fcb8ec78c3b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

