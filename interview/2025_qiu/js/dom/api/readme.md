# DOM api

- JS提供了什么基础的方法可以获取D0M或者查询D0M，知道都可以说。
    DOM 查询大体有两类：传统 API（性能优先、功能有限）和 现代选择器 API（灵活、语义更强）
-  按分类讲常见 API
    按 ID / 标签 / 类名查询
    document.getElementById(id) —— 唯一元素，性能最好。
    document.getElementsByTagName(tag) /
    document.getElementsByClassName(class)
    返回实时 HTMLCollection，常用于批量元素操作。

- 现代选择器 API
    document.querySelector(cssSelector)
    返回首个匹配元素，语义直观，支持复杂 CSS 选择器。
    document.querySelectorAll(cssSelector) —— 返回静态 NodeList，适合遍历和批量操作。

- 关系型 API
    element.parentNode children  nextElementSibling(兄弟)

- 特殊获取
    document.forms, document.images —— 表单/图片集合，传统页面开发常用。
    document.getElementsByName(name) —— 表单控件，radio 分组时经常用。

- 结合业务场景举例
    登录页只需要获取某个表单元素：getElementById 最快。
    批量处理卡片组件：querySelectorAll('.card') 结合 forEach 遍历更直观。
    做无限滚动加载时监听最后一个元素：querySelector 精准锁定。
    表单校验：用 document.forms['loginForm'].elements['username'] 直接拿到输入框。

