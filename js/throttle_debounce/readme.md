# 防抖节流

- json-server 驱动的后端接口 API
- 把网站需要的各个模块的数据都准备好 
    - users
    - posts
    ...
    外键关联  users.id = posts.userId

## restful
- 一切皆资源
- 定义的访问资源的方式  Method + URL 

-  所有用户
- 某个用户 
    http://localhost:3000/users/:id
- 所有的文章
    http://localhost:3000/posts
- 某篇文章
     http://localhost:3000/posts/:id
    
- 新增文章？
    POST http://localhost:3000/posts

## 事件
    - keyup 猴急找到想要的数据
        猜你喜欢
        googleSuggest, 最早google 发明 
    - ajax 向服务器请求数据
        动态修改页面的能力
            一定的频度  防抖/节流 
    - 服务器的压力 
        -   并发
        - 总连接数是有上限的
        - CPU / 内存 

## es6 特性
    - 简洁 优雅
        箭头函数 展开扩展运算符 解构赋值   字符串模板 默认值 
        Promise 规避了回调地狱
    - 可读性
        map filter 等数组新方法
        class 
        let const 
        Promise then  可读性
    - 大型语言的能力
        let const 块级作用域
        class extends 
        es6 模块化
        Promise async await  异步变同步

##  防抖
    - 性能优化主题
        减少请求次数
        服务器的压力
    - 闭包
        - func 交给debounce 通用防抖功能函数
        - 抽象  func(要防抖的函数, 延迟时间)
        - 定时器 清除上一次的定时器
        - delay时间内的定时器都被干掉了
        - 最后那一次可以执行（之后没输入，两次输入超过delay 时间） 