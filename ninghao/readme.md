[source](https://ninghao.co/c/zAL7n5)

mastra

- corpack 
    Corepack 是 Node.js 官方的包管理器管理工具，它可以帮助开发者在项目中无缝切换和使用不同版本的 npm、yarn 和 pnpm。

    Corepack 确保团队在同一项目中使用相同版本的包管理器，避免因包管理器版本不一致导致的问题，并且无需手动安装多个包管理器，提高开发效率。

    corepack enable
    corepack --version

-   corepack enable pnpm 
    节省磁盘空间，并提供更快的安装速度和更严格的依赖管理。

- pnpm dlx nuxt@latest init nid-agent
    - pnpm 
    - 
## 跑通openai
- pnpm add openai
- nuxt-config.ts
    - .env https://agicto.com/ key
    - runtimeConfig
    - server 
        - utils
            openai.ts
        - api
            chat.ts
    curl http://localhost:3000/api/chat

## 客户端测试
- rest client 
- 修改api/chat.ts
- 跟目录下新建request.http
- Send Request 

## deepseek 
- .env 加配置
- utils/deepseek.ts
- api/chat.ts
- request.http 

## 纯client 连接
request.http
api/chat.ts

## 基本概念
- token 处理内容的最小单元
    - 1个token 3个英文字符， 一个中文字符 0.6个token 
    - 输入、输出
    - useAge
        - prompt_tokens 输入token
        - completion_tokens 输出
        - total_tokens 总
        - 百万token 为单位   
            - deepseek  0.5元/百万  2元/百万（未命中缓存）8元（输出） 晚上五折
            
- temperature 创意 0～2
    0 写代码 数据
    1.5 创业
    1.3 翻译 通用对话
    1.0 数据清洗 数据分析

## 理解对话补全
- pages/playground/chat.vue
- messages 维护
    - who are you?
- 没有记忆的， 

## 调用函数
- 函数
- 根据问题， 调用相应函数
- 带上函数值返回
    api/playground/tools.ts
    