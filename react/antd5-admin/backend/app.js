// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件

app.use(cors())

// 导入并注册仪表盘模块
const dashboardRouter = require('./router/dashboard')
app.use('/dashboard', dashboardRouter)


app.listen(9999, function () {
    console.log('api server running at http://127.0.0.1:9999')
})
