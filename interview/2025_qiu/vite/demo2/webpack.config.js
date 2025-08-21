const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',          // 入口：a 依赖 b，b 依赖 c
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',          // 开发模式
  target: 'web',
  module: {
    rules: [
      // 可添加 babel-loader 等
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: false
    })
  ],
  // 👇 新增：webpack-dev-server 配置
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist') // 服务器根目录
    },
    port: 8080,                  // 端口
    open: true,                  // 自动打开浏览器
    hot: true,                   // 启用模块热替换（HMR）
    compress: true,              // 启用 gzip 压缩
    historyApiFallback: true,    // 支持单页应用（SPA）路由
    client: {
      overlay: true,             // 编译错误时在浏览器显示遮罩层
    }
  }
};