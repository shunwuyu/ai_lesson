// 引入express
const Koa = require('koa') 
const app = new Koa()
const Vue = require('vue') // vue@next
const renderer3 = require('@vue/server-renderer')
const vue3Compile= require('@vue/compiler-ssr')
const Router = require('koa-router');
const router = new Router();

// 一个vue的组件
const vueapp = {
  template: `<div>
    <h1 @click="add">{{num}}</h1>
    <ul >
      <li v-for="(todo,n) in todos" >{{n+1}}--{{todo}}</li>
    </ul>
  </div>`,
  data(){
    return {
      num:1,
      todos:['吃饭','睡觉','学习Vue']
    }
  },
  methods:{
    add(){
      this.num++
    }
  } 
}
// 使用@vue/compiler-ssr解析template
// 这段代码将Vue应用的模板编译成函数，然后通过new Function创建一个可执行的渲染函数，用于服务器端渲染。
vueapp.ssrRender = new Function('require',vue3Compile.compile(vueapp.template).code)(require)
// 路由首页返回结果
router.get('/',async function(ctx){
    // 使用Vue的createSSRApp方法创建一个Vue SSR应用实例，传入之前定义的vueapp组件
    let vapp = Vue.createSSRApp(vueapp)
    // 异步将 Vue SSR 应用实例 vapp 渲染为 HTML 字符串
    let html = await renderer3.renderToString(vapp)
    const title = "Vue SSR"
    let ret = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="app">
      ${html}
    </div>
  </body>
</html>`    
    ctx.body = ret
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(9093,()=>{
    console.log('listen 9093')
}) 