- 看一个例子
1.html
发现什么问题？
- 重复定义
- 提取公共样式

## 原子 CSS
每一个 class 只做一件事，只描述一个最小样式单元
TailwindCSS 是一个原子 CSS 框架。

.card {
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: ...
}

<div class="p-4 bg-white rounded-xl shadow"></div>

- 每个 class 都够原子， 
- 可以自由组合
- 不用给样式起名字
- 不用些样式

- 什么是原子 CSS？
把样式拆成最小、单一职责的 class，通过组合完成 UI

## 配置tailwindcss

