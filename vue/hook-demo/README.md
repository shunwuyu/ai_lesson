# 项目亮点 难点之hook

- 何为hooks
    以use 开头的函数 ， 将vue函数式编程(OOP)推到了一个新高度
    将响应式业务（ref,reactive,生命周期，method）封装的函数， 
    响应式业务的复用和维护方便，可以把响应式业务从组件里拆分开，放到hooks函数中复用
    封装响应式业务的细节，对团队协作友好
    极大的提升了生产效率  
    utils 工具函数 
    vue2 option api this -> vue3 setup api  编程风格
    - vue2 vue3 核心区别 函数式编程 
    vue2 state  data()  computed   methods oncreated 找 200+ 维护成本
    composition api 放到一起  好维护

    useRouter  useStore 方便 

- IntersectionObserver 是一个 JavaScript 接口，用于监控一个元素是否出现在视口（viewport）内，可以用于图片懒加载的全新API
- 观察者模式  observe(DOM)
- 实例化的回调函数里  返回 所有被观察的元素的情况 
- isIntersecting true 就在可视区 
- 完成后，取消监听 
- 比其他方案的图片懒加载更高级

- requestAnimationFrame  按刷帧率