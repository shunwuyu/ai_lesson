## 用agent ide写一道升级版debounce。

- 手戳代码
    频繁触发 → 重置计时 → 只执行最后一次
    基础能力
    ```
    /**
    * 极简防抖函数
    * @param {Function} func - 要防抖的函数
    * @param {number} delay - 延迟时间（毫秒）
    * @returns {Function} 防抖后的新函数
    */
    function debounce(func, delay) {
        let timer = null; // 存储定时器ID

        // 返回一个新的防抖函数
        return function (...args) {
            // 1. 清除上一次的定时器（频繁触发就重置计时）
            clearTimeout(timer);
            
            // 2. 重新设置定时器，延迟执行目标函数
            timer = setTimeout(() => {
                func.apply(this, args); // 绑定this和参数，保证函数正常执行
            }, delay);
        };
    }
    <input type="text" id="input" placeholder="输入测试防抖">

    <script>
    // 1. 定义要执行的函数（比如搜索请求）
    function handleSearch(e) {
    console.log("执行搜索：", e.target.value);
    }

    // 2. 创建防抖函数（延迟500毫秒）
    const debounceSearch = debounce(handleSearch, 500);

    // 3. 绑定事件
    document.getElementById("input").addEventListener("input", debounceSearch);
    </script>
    ```

- 手戳代码升级版本
    高级能力
    debounce2.html
    - leading：是否立即执行
    - cancel()：取消
    - 返回值处理（Promise 支持）

- hooks 版本
    debounce-demo

- AI 协作能力
    会不会“用 AI 写对代码”， Prompt能力

    ```
    你是一位具有 10 年经验的 JavaScript 高级工程师，熟悉函数式编程、浏览器事件模型以及 lodash 等工具库的源码实现。

现在你需要实现一个“企业级 debounce 函数”，要求代码具备高可读性、健壮性，并接近 lodash.debounce 的能力水平。

【功能要求】
1. 支持基础防抖功能：多次调用只在最后一次执行
2. 支持 options 参数：
   - leading: 是否在首次触发时立即执行
   - trailing: 是否在停止触发后执行
3. 支持 this 绑定和参数透传（不能丢失上下文）
4. 返回值需要正确处理（多次调用返回一致的结果）
5. 提供以下附加方法：
   - cancel(): 取消当前防抖
   - flush(): 立即执行当前待触发函数
6. 需要处理边界情况：
   - 连续快速触发
   - leading 和 trailing 同时存在
   - timer 清理问题
7. 使用 TypeScript 编写，保证类型安全（泛型支持函数参数和返回值）

【代码要求】
1. 不要使用 lodash 或任何第三方库
2. 代码结构清晰，适当拆分内部函数（如 invoke）
3. 添加必要注释，说明关键逻辑（尤其是 leading / trailing 的处理）
4. 保证没有内存泄漏风险（timer 必须正确释放）

【输出要求】
1. 只输出最终代码，不要解释
2. 代码必须可以直接运行
    ```

- 角色约束
    作用：
        提升代码质量（AI 会更严谨）
        自动偏向工程实现，而不是玩具代码
- 对标对象（隐形加分）
    接近 lodash.debounce 的能力水平 直接锁定“行业标准答案”
    避免 AI 写简化版

- 明确功能边界
    你把需求拆成：
        功能
        边界条件
        API 设计

- 限制输出
    只输出最终代码，不要解释

- 强制 TypeScript,技术栈需求
    使用 TypeScript + 泛型

## git pull git fetch

- git fetch 只拉取远程更新，安全又不影响当前分支；
    本地 main  / dev 分支
    远程 origin/main、origin/dev
    fetch 只是把远程最新代码 “下载到本地仓库备份”，不合并、不覆盖、不影响你当前写的任何代码。

    接着
    1. 看本地分支 和 远程分支差多少
    git diff main origin/main
    能看到：远程改了哪些代码、你本地缺哪些更新。

    2. 看提交日志对比
    看远程比本地多了哪些提交
    git log main..origin/main

    3. 三种场景后续操作
    你本地没改代码，直接合并更新
    切到主分支
    git checkout main
    把 origin/main 的更新合并到本地main
    git merge origin/main

    4. 你本地有自己的修改 / 正在开发，不想立刻合并
    - 先暂存自己代码
    git stash 暂存

    - 切主分支合并远程
    git checkout main
    git merge origin/main

    - 切回开发分支，恢复自己代码
    git checkout 你的开发分支
    git stash pop

    - 不想用 merge，想干净线性更新（rebase 常用）
    git checkout main
    git rebase origin/main


- git pull 会在 fetch 后自动 merge 或 rebase。

- 理解git rebase 准备全新测试项目
```
# 1. 新建文件夹并进入
mkdir git-test-demo && cd git-test-demo

# 2. 初始化Git仓库
git init

# 3. 创建初始文件+首次提交
echo "主线初始代码" > main.txt
git add .
git commit -m "初始化：main初始提交"

# 4. 创建开发分支 dev 并切换过去
git checkout -b dev
echo "开发分支新增功能" > dev.txt
git add .
git commit -m "dev：新增开发功能"

# 5. 切回main，模拟同事远程改了主线
git checkout main
echo "主线被远程更新修复bug" >> main.txt
git add .
git commit -m "main：修复线上BUG"
```
你执行完我前面的命令后，结构是这样的：
plaintext
main:    A(初始) → B(修复bug)
             
dev:     A(初始) → C(开发功能)
共同祖先：A
main 比 dev 多了一个 B
dev 比 main 多了一个 C

- 二、先演示：用 git merge 会出现什么问题

    - 切回 dev，执行 merge 合并 main
    git checkout dev
    把main合并到dev
    git merge main

    - 看可视化提交树
    git log --oneline --graph --all

     Merge 出现的问题（小白必懂）
    自动多出一条合并提交记录；
    提交树分叉缠绕，多人协作越多，历史越杂乱；
    后期查 bug、回滚代码极难理清脉络。

    三、重置项目：删掉 merge，重新纯净开始
    先撤回刚才 merge，回到干净状态，准备用 rease 重做：
    git reset --hard HEAD^

    四、全程实操：用 git rebase 优雅重做一遍
    步骤 1：保证 main 是最新（和前面一样）
    git checkout main

    步骤 2：切到 dev 分支执行 rebase
    git checkout dev
    核心命令：把dev所有提交，挪到main最新顶端
    git rebase main

    git log --oneline --graph --all

     Rebase 效果对比
没有多余合并节点；
所有提交变成一条笔直线性历史；
dev 的提交自动 “搬运” 到 main 最新代码后面；

    把你的 D、E“摘下来”，重新接到 C 后面

    一、先用一句话讲清本质

你先这样说：

merge 是“把两条分叉的历史拼在一起”，
rebase 是“把你的提交搬到最新主线后面，让历史变成一条直线”。

二、用一个全新例子（非常关键）

假设现在有这样一个场景：

你从 main 拉了一个分支 feature
你写了 2 次提交
同时别人也在 main 提交了 2 次
🧱 初始结构（分叉了）
main:    A --- B --- C
                   \
feature:            D --- E

👉 含义：

A B C 是主分支
D E 是你写的代码
现在 main 和 feature 分叉了
三、如果用 merge（常见但不干净）

执行：

git merge origin/main

结果👇

main:    A --- B --- C
                   \ 
feature:            D --- E --- M
                      \       /
                       -------

👉 解释：

Git 创建了一个 合并节点 M（merge commit）
历史变成“网状结构”
❗ 问题

你可以这样说：

merge 会让提交历史变复杂，后期排查问题（git log）会很乱。

四、如果用 rebase（重点来了）

执行：

git rebase origin/main

Git 做了什么？

👉 把你的 D、E“摘下来”，重新接到 C 后面

✨ 结果（核心对比）
main:    A --- B --- C --- D' --- E'

👉 注意：

D → D'
E → E'
（是“新的提交”，不是原来的）
五、直观对比（面试必杀图）
merge（网状 ❌）
A --- B --- C
       \     \
        D --- E --- M
rebase（直线 ✅）
A --- B --- C --- D' --- E'

👉 你可以总结一句：

rebase 的目标就是：让 Git 历史变成一条干净的时间线

- 为什么需要 rebase

    1. 提交历史更清晰

所有提交是线性的，像时间轴一样，一眼能看懂

    2. 更方便排查问题（大厂很看重）

    3. 更符合团队规范
        提交到主分支前必须 rebase，保证历史干净

- 什么时候不能用 rebase
    rebase 不适合已经 push 到远程的公共分支

- 实际开发中我更倾向用 fetch + rebase，这样更安全、可控，也能保持提交历史整洁。

## 小龙虾你怎么学习的

- OpenClaw（小龙虾）是当下爆火的开源本地AI智能体；核心就是把你说的话直接变成实际操作，比如帮你操作电脑、浏览器、改代码、调接口这些；一般用 Node.js 和 TypeScript 来开发，支持插件扩展（Skills）和 MCP 协议。 我目前尝试过QClaw等。

从 Skills 角度看，openclaw 的价值在于把企业里的经验和岗位能力沉淀成可复用模块，比如财务报账、架构设计、投资分析等，都可以变成 Skill 被调用和组合，从而提升整体效率，本质是在构建一个“AI 员工系统”。

通过 MCP 接入高德地图这种外部能力，openclaw 可以帮助旅游企业员工把“查资料 + 规划路线 + 输出方案”这一整套流程自动化执行，并邮件给客户。

比如我早上在地铁上，只需要用手机发一句指令：
👉 “帮我完成用户登录模块的开发，包括接口、前端页面、单元测试，并跑一遍测试，有问题直接修复，最后给我一份报告。”

## 前端开发者怎么使用openclaw

- 把前端开发流程“Agent 化“
   -  把 UI 开发能力封装成 Skill
   根据 PRD 或设计稿生成 React 组件结构
   基于tailwindcss生成基础样式
   - 接口联调
   自动 mock 数据（本地开发）
   自动生成 API 请求代码
   - 状态管理 & 逻辑拆分（工程能力）
   zustand编写
   自动拆分 hooks
   - 代码重构 & 性能优化
   把 JS 重构为 TypeScript
   优化性能（减少重复渲染、代码分割）

   我觉得 openclaw 对前端最大的改变是：

👉 把前端从“实现 UI 的角色”，变成“编排业务能力的角色”

    比如我要开发一个商品列表页，我可以这样做：

    👉 “生成一个商品列表页，包括接口请求、分页、筛选、单元测试”

    