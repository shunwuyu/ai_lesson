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

    git status

    git log --oneline

    git restore --staged file.js   # 反悔：把已暂存文件退回工作区
    git restore file.js            # 丢弃本地未暂存改动


    # 丢弃最近一次提交，代码保留在工作区（可以重新修改）
    git reset HEAD~1

    # 或者丢弃提交，代码回到暂存区（git add 状态）
    git reset --soft HEAD~1

    # 彻底丢弃提交和修改（慎用！代码会消失）
    git reset --hard HEAD~1

    - git diff # 工作区 vs 暂存区
    - git diff --staged                # 暂存区 vs HEAD
    - 

    - 提交pr

    在商品详情页增加‘加入购物车’按钮

    # 切换到 main 分支
    git checkout main

    # 拉取最新代码
    git pull origin main

    # 创建并切换到新分支（命名规范：feature/功能描述）
    git checkout -b feature/add-add-to-cart-button

    修改了商品详情页组件：

    文件：src/components/ProductDetail.js
    # 查看修改状态
    git status

    # 添加修改的文件
    git add src/components/ProductDetail.js

    # 提交到本地仓库
    git commit -m "feat: add 'Add to Cart' button on product page"

    # 第一次推送，设置上游分支
git push -u origin feature/add-add-to-cart-button

    创建 Pull Request（PR）
    Leader 审核通过，点击 “Merge” 按钮，你的代码被合并到 main 分支。

    # 切换回 main
    git checkout main

    # 拉取最新代码（包含你的合并）
    git pull origin main


    - 临时改动保全
    git stash push -m "WIP: 登录表单校验" -p 


- ts 有没有使用过？
    要诚实，又要体现学习能力、主动性和对技术的理解深度。
    我知道 TypeScript 能为 React 项目带来更好的类型安全和开发体验，比如给 props、state、事件处理函数等添加类型，减少运行时错误。

    我理解基础类型、接口（interface）、类型别名（type），也了解泛型（generics）的基本概念，比如用在 useState<T> 或自定义 Hook 中，让组件更灵活、可复用。”

    我也尝试过用 TypeScript 写一些小的 React 组件，比如定义一个带类型的 Button 组件或 Todo 列表。虽然经验还不深，但我一直在主动学习，比如看官方文档、写练习项目，希望能在实际项目中进一步掌握。
