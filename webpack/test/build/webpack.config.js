const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: path.resolve(__dirname, '../src/js/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
        {
            test:/\.(vue)$/,
            use:{
                loader:"vue-loader"
            }
        },
        {
            test: /\.jsx?$/,
            use: {
              loader:'babel-loader',
              options: {
                    presets: ["@babel/preset-env"],
                    plugins: [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                "corejs": 3
                            }
                        ]
                    ]
                }
            },
            exclude: /node_modules/ //排除 node_modules 目录，
        },
        {

        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader',
            ]
        },
        {
            test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240, //低于10k的资源将会被转化成base64
                        esModule: false // 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
                    }
                },
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/'
                    }
                }
            ],
            exclude: /node_modules/
        }
    ]
},
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '首页',
      template: './index.html', // 指定要使用的 HTML 模板文件
      filename: 'index.html',
    })
  ],
  devServer: {
    port: '3000', //默认是8080
    compress: true //是否启用 gzip 压缩
},
  mode: 'development'
}