const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const app = new Koa()

app.use(async ctx=>{
  const {request:{url,query} } = ctx
if(url=='/'){
    ctx.type="text/html"
    let content = fs.readFileSync('./index.html','utf-8')
    
    ctx.body = content
  }
})
app.listen(24678, ()=>{
  console.log('快来快来数一数，端口24678')
})