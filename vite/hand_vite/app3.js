const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()

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
      
      ctx.body = content
  }else if(url.endsWith('.js')){
    // js文件
    const p = path.resolve(__dirname,url.slice(1))
    // console.log(p, '////')
    ctx.type = 'application/javascript'
    const content = fs.readFileSync(p,'utf-8')
    console.log(content, '||||/////')
    ctx.body = rewriteImport(content)
  }
})
app.listen(24678, ()=>{
  console.log('快来快来说一书，端口24678')
})
