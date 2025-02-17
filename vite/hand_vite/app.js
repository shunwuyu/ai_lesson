const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()
const compilerSfc = require('@vue/compiler-sfc') // .vue
const compilerDom = require('@vue/compiler-dom')

function rewriteImport(content){
  return content.replace(/ from ['|"]([^'"]+)['|"]/g, function(s0,s1){
    // . ../ /开头的，都是相对路径
    if(s1[0]!=='.'&& s1[1]!=='/'){
      return ` from '/@modules/${s1}'`
    }else{
      return s0
    }
  })
}

app.use(async ctx=>{
  const {request:{url,query} } = ctx
  if(url=='/'){
    ctx.type="text/html"
    let content = fs.readFileSync('./index.html','utf-8')
    content = content.replace('<script ',`
      <script>
        window.process = {env:{ NODE_ENV:'dev'}}
      </script>
      <script 
    `)
    ctx.body = content
  }else if(url.endsWith('.js')){
    // js文件
    const p = path.resolve(__dirname,url.slice(1))
    // console.log(p, '////')
    ctx.type = 'application/javascript'
    const content = fs.readFileSync(p,'utf-8')
    // console.log(content, '||||/////')
    ctx.body = rewriteImport(content)
  }else if(url.endsWith('.css')){
    const p = path.resolve(__dirname,url.slice(1))
    const file = fs.readFileSync(p,'utf-8')
    const content = `
    const css = "${file.replace(/\n/g,'')}"
    let link = document.createElement('style')
    link.setAttribute('type', 'text/css')
    document.head.appendChild(link)
    link.innerHTML = css
    export default css
    `
    ctx.type = 'application/javascript'
    ctx.body = content
  }else if(url.startsWith('/@modules/')){
    // 这是一个node_module里的东西
    const prefix = path.resolve(__dirname,'node_modules',url.replace('/@modules/',''))
    const module = require(prefix+'/package.json').module
    const p = path.resolve(prefix,module)
    // console.log(p);
    const ret = fs.readFileSync(p,'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
  } else if(url.indexOf('.vue')>-1){
    // vue单文件组件
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    // console.log(p, '/////????')
    // 通过 compilerSFC.parse解析 Vue 组件，通过返回的 descriptor.script 获取 js 代码
    const {descriptor} = compilerSfc.parse(fs.readFileSync(p,'utf-8'))
    console.log(descriptor.script)
    // console.log(query, '????')
    if(!query.type){
      ctx.type = 'application/javascript'
      // 借用vue自导的compile框架 解析单文件组件，其实相当于vue-loader做的事情
      ctx.body = `
  ${rewriteImport(descriptor.script.content.replace('export default ','const __script = '))}
  import { render as __render } from "${url}?type=template"
  __script.render = __render
  export default __script
      `
    }else if(query.type==='template'){
      // 模板内容
      const template = descriptor.template
      // 要在server端吧compiler做了
      const render = compilerDom.compile(template.content, {mode:"module"}).code
      ctx.type = 'application/javascript'

      ctx.body = rewriteImport(render)
    }
  }
})
app.listen(24678, ()=>{
  console.log('快来快来说一书，端口24678')
})
