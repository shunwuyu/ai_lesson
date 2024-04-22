import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/auto-import-resolver';
import path from "node:path";

const {UnifiedWebpackPluginV5} = require('weapp-tailwindcss/webpack')
const config = {
    projectName: 'wx-vue-shop-0326',
    date: '2024-3-27',
    designWidth(input) {
        if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
            return 375
        }
        return 750
    },
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html', '@tarojs/plugin-http'],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {}
    },
    framework: 'vue3',
    compiler: {
        type: 'webpack5',
        prebundle: {enable: false}
    },
    sass: {
        data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
    },
    alias: {
        '@/components': path.resolve(__dirname, '..', 'src/components'),
        '@/utils': path.resolve(__dirname, '..', 'src/utils'),
        '@/package': path.resolve(__dirname, '..', 'package.json'),
        '@/project': path.resolve(__dirname, '..', 'project.config.json'),
        '@/store': path.resolve(__dirname, '..', 'src/store'),
        '@/router': path.resolve(__dirname, '..', 'src/router'),
        '@/assets': path.resolve(__dirname, '..', 'src/assets'),
        '@/pages': path.resolve(__dirname, '..', 'src/pages'),
        '@': path.resolve(__dirname, '..','src')
    },
    mini: {
        enableExtract:true,
        miniCssExtractPluginOption: {
            //忽略css文件引入顺序
            ignoreOrder: true
        },
        webpackChain(chain) {
            chain.merge({
                plugin: {
                    install: {
                        plugin: UnifiedWebpackPluginV5,
                        args: [{
                            appType: 'taro'
                        }]
                    }
                }
            })
            chain.plugin('unplugin-vue-components').use(Components({
                resolvers: [
                    NutUIResolver({
                        importStyle: 'sass',
                        taro: true
                    })
                ]
            }))
        },
        postcss: {
            htmltransform: {
                enable: true,
                // 设置成 false 表示 不去除 * 相关的选择器区块
                // 假如开启这个配置，它会把 tailwindcss 整个 css var 的区域块直接去除掉
                config: {
                    removeCursorStyle: false,
                },
            },
            pxtransform: {
                enable: true,
                config: {
                    // selectorBlackList: ['nut-']
                }
            },
            url: {
                enable: true,
                config: {
                    limit: 1024 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    },
    h5: {
        webpackChain(chain) {
            chain.plugin('unplugin-vue-components').use(Components({
                resolvers: [
                    NutUIResolver({
                        importStyle: 'sass',
                        taro: true
                    })
                ]
            }))
        },
        publicPath: '/',
        staticDirectory: 'static',
        esnextModules: ['nutui-taro', 'icons-vue-taro'],
        postcss: {
            autoprefixer: {
                enable: true,
                config: {}
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}