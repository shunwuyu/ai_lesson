import path from 'path'
/**
 * 一个用于生产环境压缩 HTML 的 Vite 插件
 */
function htmlMinifyPlugin() {
  let isBuild = false; // 标记是否为构建模式

  return {
    name: 'html-minify', // 插件名称

    // 1. config 钩子：读取用户配置，判断是否为构建命令
    config(config, { command }) {
      // 只在 build 模式下启用压缩
      isBuild = command === 'build';
      // 开发环境不压缩
      if (!isBuild) {
        console.log('[html-minify] 开发模式，跳过 HTML 压缩');
      }
    },

    // 2. transformIndexHtml 钩子：转换 index.html 内容
    // 这是处理 HTML 的核心钩子
    transformIndexHtml: {
      // 设置优先级，确保在其他 HTML 处理之后执行
      order: 'post',

      async transform(html, { bundle }) {
        // 非构建模式或没有 bundle 时不处理
        if (!isBuild || !bundle) return html;

        console.log('[html-minify] 正在压缩 HTML...');

        // 简单的 HTML 压缩逻辑
        // 实际项目中可集成 html-minifier-terser 等库
        const minifiedHtml = html
            //<!-- 注释的开始 \s：匹配所有空白字符 \S
            // 量词 + 懒惰模式尽可能少地匹配内容
            // 会从第一个 <!-- 匹配到最后一个 -->，错误地合并多个注释
          .replace(/<!--[\s\S]*?-->/g, '')           // 移除 HTML 注释
          .replace(/\s+/g, ' ')                      // 合并多个空白字符为一个空格
          .replace(/> </g, '><')   
           //   ^\s+ 这行开始的空格 ｜ \s+$行末的空格
        //    m	多行模式（multiline）：<br>• 让 ^ 和 $ 分别匹配每一行的开始和结束，而不是整个字符串的开始和结束
          .replace(/^\s+|\s+$/gm, '');              // 移除每行首尾空白

        // 返回处理后的 HTML
        return minifiedHtml;
      },
    },

    // 3. writeBundle 钩子：构建完成后执行
    // 可用于清理、验证或日志输出
    writeBundle(options, bundle) {
      const outputDir = options.dir || 'dist';
      console.log(`[html-minify] HTML 压缩完成，输出到 ${path.resolve(outputDir)}`);
    },
  };
}

export default htmlMinifyPlugin;