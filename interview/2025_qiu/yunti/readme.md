# 云梯科技

- react 用的什么版本
    18 npm init vite 
    最新版本 19 
    react 16.8 hooks, 函数式组件 2019 里程碑式的更新

- class 组件和类组件有什么区别？

    React 里“类组件”和“函数组件”是两种写法：类组件用 class 继承 React.Component，可用 state 和生命周期；函数组件用函数定义，早期无状态，但结合 Hooks 也能管理状态和副作用，写法更简洁。

    1. 写法简洁 —— 直接用函数返回 JSX，无需 this 绑定。类组件会有 this 丢失问题 。
    2. 性能更好 —— 没有类实例和冗余生命周期调用，渲染开销更小。
    3. 更易测试 —— 纯函数结构，输入输出可预测。
    4. 与 React 新特性契合 —— Hooks 等优先支持函数组件。

- 说一下git  常用命令
    - 初始化与身份
    git init
    git config user.name "Andrew"
    git config user.email "andrew@example.com"

    可用 --global 设为全局。
    新项目 或 刚入职 

    - 分支 branch
    git checkout main 切换到主分支
    git pull origin main 拉取最新代码
    git checkout -b shunwuyu 创建并切换到你的开发分支