[source](https://time.geekbang.org/column/article/471017)

树形结构的diff算法
虚拟DOM属性的变化，以及如何更新数组的子元素
- 位运算
    在执行diff之前，每个VDOM节点有哪些属性需要计算，
    静态属性和节点都不发生变化 ，可以跳过 patchFlag 
    & 操作符判断操作的类型  
    PatchFlags.CLASS

- 最长递增子序列

n 和 n-1 每个二进制位的数字都不一样，我们可以很轻松地用按位“与”来判断这个题的答案

- vue动态属性
    文本  class   style   props  我们使用左移的方式分别在四个二进制上标记了 1，代表四种不同的权限，使用按位或的方式去实现权限授予。

    const PatchFlags = {
        TEXT:1,      // 0001
        CLASS: 1<<1, // 0010
        STYLE:1<<2,  // 0100 
        PROPS:1<<3   // 1000
    }

    const flag1 = PatchFlags.TEXT | PatchFlags.STYLE // 0101

// 权限校验

    flag1 & PatchFlags.TEXT  // 有权限，结果大于1
    flag1 & PatchFlags.CLASS //没有权限 是0

- 新老子元素都是数组的时候， 首尾的判断  
inferno 
尽可能少的操作DOM 