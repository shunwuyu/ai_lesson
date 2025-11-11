[source](https://juejin.cn/book/6844733800300150797/section/6844733800342093832)

- 数据结构我们要搞哪些？
  - 数组
  - 栈
  - 队列
  - 链表
  - 树（这里我们着重讲二叉树）

- 数组
  开箱即用的数据结构
  - 数组的创建
  const arr = [1, 2, 3, 4]  
  不过在算法题中，很多时候我们初始化一个数组时，并不知道它内部元素的情况。怎么办？
  - 构造函数创建数组
  const arr = new Array()
  等价于：
  const arr = []
  不过咱们使用构造函数，可不是为了创建空数组这么无聊。那么为啥？
  - 创造指定长度的空数组”这样的需求
    - 预分配空间
    - 支持索引访问（连续存储）
    - 提升效率 ()
      避免频繁扩容和内存复制，减少时间开销。
    - 避免动态扩容开销
    需向系统申请一块更大的新内存，这本身就有时间成本
    原数组所有元素必须逐个复制到新内存，时间复杂度为 O(n)
    const arr = new Array(7)
    empty

  - 创建一个长度确定、同时每一个元素的值也都确定的数组
    const arr = (new Array(7)).fill(1)

## 数组的访问和遍历

- 访问数组中的元素，我们直接在中括号中指定其索引即可：
arr[0]

- 遍历数组
  - for 循环
  // 获取数组的长度
  const len = arr.length
  for(let i=0;i<len;i++) {
      // 输出数组的元素值，输出当前索引
      console.log(arr[i], i)
  }

  - forEach
    通过取 forEach 方法中传入函数的第一个入参和第二个入参，我们也可以取到数组每个元素的值及其对应索引：

    arr.forEach((item, index)=> {
    // 输出数组的元素值，输出当前索引
      console.log(item, index)
    })
  - map 方法
    map 做的事情不仅仅是遍历，而是在遍历的基础上“再加工”
    对数组内容做批量修改、同时修改的逻辑又高度一致时，就可以调用 map 来达到我们的目的：

    const newArr = arr.map((item, index)=> {
    // 输出数组的元素值，输出当前索引
    console.log(item, index)
    // 在当前元素值的基础上加1
    return item+1
    })
    - for of 
    for(let item of arr) {
      console.log(item)
    }
    到底用哪一个呢？
    从性能上看，for 循环遍历起来是最快的， 
    个人推荐如果没有特殊的需要，那么统一使用 for 循环来实现遍历

  ## 二维数组
    二维数组其实就是数组套数组，也就是每个元素都是数组的数组。
    const arr = [
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5],
  [1,2,3,4,5]
]
  逻辑结构
  ![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/3/8/170b9bedc6a882c1~tplv-t2oaga2asx-jj-mark:3780:0:0:0:q75.awebp)

  一维数组一条“线”一般的布局，二维数组更像是一个“面 矩形
  长方阵列排列的复数或实数集合，被称为“矩阵”。因此二维数组的别名就叫“矩阵”。

  记住“矩阵”和“二维数组”之间的等价关系。在算法题目中，见到“矩阵”时，能够立刻反射出它说的是二维数组.

  ## 二维数组的初始化
  - 如何初始化？
  const arr =(new Array(7)).fill([])
  arr[0][0] = 1
  你会发现一整列的元素都被设为了 1：
  当你给 fill 传递一个入参时，如果这个入参的类型是引用类型，那么 fill 在填充坑位时填充的其实就是入参的引用

  - 如何安全初始化？
  直接用一个 for 循环来解决：
  const len = arr.length
  for(let i=0;i<len;i++) {
      // 将数组的每一个坑位初始化为数组
      arr[i] = []
  }

  ## 二维数组的访问
  ```
  // 缓存外部数组的长度
const outerLen = arr.length
for(let i=0;i<outerLen;i++) {
    // 缓存内部数组的长度
    const innerLen = arr[i].length
    for(let j=0;j<innerLen;j++) {
        // 输出数组的值，输出数组的索引
        console.log(arr[i][j],i,j)
    }
}
  ```
  N 维数组需要 N 层循环来完成遍历。
  