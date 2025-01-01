https://time.geekbang.org/column/article/428106

- 如下怎么实现？
  - 找到元素， 监听事件 DOM操作
  - jquery  优化了API 更方便，但任然是DOM
  - 不要再思考页面的元素怎么操作，而是要思考数据是怎么变化的。

- 专注于数据的操作
  Vue 让前端开发者能够专注数据本身的操作，而数据和页面的同步问题，则交由 Vue 来负责。
  2.html
  - 页面上显示数据 focus 数据
  - 交给vue  data 里声明数据
  - v-model 双向绑定 输入框和数据的同步

- todoList
  3.html 数据 todos 交给vue v-for
  methods 新增了一条 数据驱动页面的魅力

  - todo check 响应式


- 4.html 
- 5.html 计算属性


- 7.html
  由于所有数据都挂载在 this 之上，因而 Options API 的写法对 TypeScript 的类型推导很不友好，并且这样也不好做 Tree-shaking 清理代码。新增功能基本都得修改 data、method 等配置，并且代码上 300 行之后，会经常上下反复横跳，开发很痛苦。代码不好复用，Vue 2 的组件很难抽离通用逻辑，只能使用 mixin，还会带来命名冲突的问题。
  使用composition api
  不再上下反复横跳，我们可以把一个功能模块的 methods、data 都放在一起书写，维护更轻松。
  而右边的 Compositon API 就不一样了，每个功能模块都在一起维护。
  ![](https://static001.geekbang.org/resource/image/a0/5f/a0010538b40e48fc5fc68b0eed2b025f.jpg?wh=3220x2046)



  https://github.com/course-dasheng/geektime-vue-course/blob/main/08-001%E8%AF%84%E4%BA%94%E6%98%9F%E4%BE%8B%E5%AD%90/src/components/Rate0.vue

  - App3.vue
    import { ref,computed } from "vue";
    composition api

  - App.vue 
    其实你可以把组件内部的任何一段代码，从组件文件里抽离出一个独立的文件进行维护。
    
