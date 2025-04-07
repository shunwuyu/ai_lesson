https://www.bilibili.com/cheese/play/ep1502228?query_from=0&search_id=18347856443108733589&search_query=mcp&csource=common_hpsearch_null_null&spm_id_from=333.337.search-card.all.click

- mcp
anthropic（claude） 开发的极简化协议

- 使得大语言以统一的方式连接，访问到外部的数据和工具

- Model Context Protocol MCP
    适配器 USB 接口

- B/S

- 三个角色
    - MCP 宿主 cursor
    使用MCP 连接各种资源的应用程序
    - MCP 客户端 
    宿主内部的组件  1:1  连接
    - MCP 服务器

## mcp 介绍

革新型的开源协议，改变了大预言模型与外部世界交流的方式。通过提供标准化的方法或接口
使得大模型可以连接到各种数据源，工具，服务，拓展大预言模型的边界。

adapter agent workflow 

B/S 

Cursor cline 支持mcp 协议

use 接口 

## 核心
- 资源 resource
    - 文本
    - 二进制 声音 图片

    [协议]://[主机]/路径
    file://home/user/documents/report.pdf
    postgres://database/customers/schema
    screen://localhost/display1
- 提示词
    PromptTemplate
    {
        name:string;
        description: string;
        arguments: [
            {
                name: string;
                description: string;
                required?: boolean
            }
        ]
    }

    prompts/list 

    {
        prompts: [
            {
                name: "translate-into-chinese",
                descrition:"需要翻译的内容",
                required: true
            }
        ]
    }

- 工具
    与提示词模版相似
    list_tools

- 采样
    MCP中的采样是指从数据集中随机选择样本，以便进行分析或训练模型，帮助提高效率和减少计算成本。

- 根目录
    可以操作的目录层级
    当客户端连接到服务器时，他会申明服务器应该使用哪些roots

- 传输层
    mcp 通信通道
    json rpc 2.0
    请求， 响应 通知

    - SSE 

## sdk
https://github.com/modelcontextprotocol/typescript-sdk

## claude 桌面应用配置
    - 客户端
    - filesystem

## mcp 服务器
