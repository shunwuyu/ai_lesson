const express = require('express')
const app = express()

app.get('/user', (req, res) => {
  res.json({ name: 'test', msg: '代理跨域成功' })
})

app.listen(3000, () => {
  console.log('后端服务：http://localhost:3000')
})