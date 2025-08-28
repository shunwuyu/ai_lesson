const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// webpack 配置文件
module.exports = {
    entry: './src/main.tsx', // 申明入口， webpack整理依赖关系，并打包
    output: {
        // filename: 'bundle.js',
        // filename: 'bundle.[contenthash].js', 
        // 👇 入口 chunk 文件名
        filename: '[name].[contenthash].js', 
        // 👇 非入口 chunk 文件名 (关键！)
        chunkFilename: '[name].[contenthash].js', 
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    // mode: 'development', //开发模式
    mode: 'production', // tree shaking
    target: 'web',
    module: { // webpack 支持解析的模块文件
        rules: [
            // {
            //     test: /\.css$/i, // css文件在这里处理
            //     use: ["style-loader", "css-loader"]
            // },
            {
                test: /\.css$/i,
                use: [
                    // 👇 在生产模式下使用 MiniCssExtractPlugin.loader
                    // 在开发模式下，为了热更新，可以继续使用 style-loader
                    // process.env.NODE_ENV === 'production' 
                    //     ? MiniCssExtractPlugin.loader 
                    //     : 'style-loader',
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(js|jsx|ts|tsx)$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-react',
                            // 添加 TypeScript 预设
                            ['@babel/preset-typescript', { 
                            // isTSX: true,  // 通常 babel 会根据文件扩展名自动判断
                            // allExtensions: true // 支持所有扩展名
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                // 改为 'asset'，让 Webpack 根据大小自动决定处理方式
                type: 'asset', 
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb 以下的图片转为 base64
                    }
                },
                // 可选：为作为独立文件输出的图片指定路径
                generator: {
                    filename: 'assets/images/[name].[hash:8][ext]' // 大于10kb的图片会输出到这里
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
        // 👇 添加插件实例
        new MiniCssExtractPlugin({
            // 定义输出的 CSS 文件名
            filename: 'css/[name].[contenthash].css' // 例如: css/main.abc123.css
            // chunkFilename: 'css/[id].[contenthash].css' // 用于代码分割的 chunk
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'dist')
        }
    },
    optimization: {
        usedExports: true,  // // 告诉 webpack 标记哪些导出被使用了（Tree Shaking 的基础）
        splitChunks: {
            minSize: 0, // 👈 调试时设为 0
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: 10,
                    // 👇 这里的 'vendor' 会作为 [name] 变量的值
                    name: 'vendor', 
                    chunks: 'all',
                    // 👇 确保至少被一个 chunk 引用就拆分
                     minChunks: 1,
                     enforce: true 
                }
            }
        }
    }
}