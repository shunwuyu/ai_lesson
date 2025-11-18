# cue 不止是补全

> 当你思路清晰，完全掌控代码时，Tab 补全就是你最好的编程搭档。

它能够预测你接下来想要编写的内容，不仅可以加快你的打字速度，更重要的是让你能够专注于代码的业务逻辑，而不是繁琐的语法细节。

在 Trae 中，这项功能由一个名为 Cue 的强大特性驱动，它将代码补全的体验提升到了一个全新的高度。

## Cue：不止是补全

Cue 是 Trae 提供的一套智能编程工具集。它的中文意思是"提示"

- 1. 智能代码补全

Cue 能够理解当前文件中的已有代码，并据此续写出高度相关的代码。

假设我们已经有了一个根据 ID 查找用户的函数。此时，我们只需要输入一行注释来说明意图，Cue 就能帮我们生成一个全新的、通过邮箱获取用户信息的函数。

```js
// 原代码
/**
 * 根据ID获取用户信息
 * @param id 用户ID
 * @param users 用户列表
 * @returns {User} 用户对象
 */
async function getUserById(id: string, users: User[]) {
    // ...函数实现
}
// // 根据邮箱
```
cue 鼠标移入 采纳

- 多行修改
更进一步，Cue 能够感知代码上下文的变化，并智能地提出跨越多行的修改建议。

```
/**
 * 查找所有非活跃用户
 * @param users 用户列表
 * @returns {User[]} 非活跃用户列表
 */
async function getInactiveUsers(users: User[]) {
    const inactiveUsers = await users.filter(user => user.status === 'INACTIVE');
    return inactiveUsers;
}
```

- 5. 文档内容也能补全

# 项目介绍