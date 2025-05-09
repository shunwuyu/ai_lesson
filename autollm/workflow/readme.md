[source](https://ninghao.co/c/CaL8zw)

- make.com

Make.com是一个无代码自动化平台，允许用户通过可视化界面连接和自动化不同应用程序之间的工作流程。

手工在不同的系统或平台里去做复制或粘贴，可以想办法定制一条自动工作的工作流。

- scenarios 场景/情景 工作流
    - 新增
        - 搜索rss 博客更新内容
        https://www.ycombinator.com/blog/feed
        - retrieve rss feed items
        检索
            URL
            maximum number of returned items
        - 点击闹钟 Schedule setting
            15分钟执行一次
            Days of the week
            Monday

## LLM

- add another module
    - OpenRouter 
    create a completion
    Create a connection
    - 选择模型 deepseek
    - message role user
        hello
    - 测试一下

    openrouter 可以 切换其他模型

## 引用内容

- Content should lead to increased network connections or followers.
Posts should drive desired interactions, such as comments or discussions around the topic.
Past successful LinkedIn post data can be used for reference to maintain consistency and performance.
please based on following article to generate a LinkedIn post:

<article> <title>{{2.title}}</title> <description>{{2.description}}</description> <summary>{{2.summary}}</summary> </article>

## 集成第三方应用

丛一些系统里获取或存储一些数据。
现在把大模型生成的帖子存到notion

- 添加
- notion database item
    - connection notion
    - notion 创建数据库的过程
    - 相应字段
    - 数据库就有相应数据

- notion search 

    - 之前录入过的过滤掉
    - 添加一个notion search objects
    - 读取制定ID 的记录
    - Database ID YC 搜索
    - Filter
        ID
        Equals
        rss id
    - limit 1

- 添加过滤器
    - setup filter 
        search objects 和 openRouter 之间
    - filter
        - label filter out existing item
        - condition properties Value.id[] Text.Content
        - not equal to
        - rss id
## router 新的分支
    - rss 后添加新的router
    - 添加一个文本聚合器 TextAggregator
    - souce module
        RSS Retrieve RSS feed items
    - <article>
     <title>{{9.title}}</title>
     <description>{{9.description}}</description>
    <created>{{9.dateCreated}}</created>
    </article>
    - 添加openRouter
    - create a chat completion
    - model claude
    - role user
    ROLE DEFINITION:
- As an AI Report Generator, your primary role is to synthesize information from a set of articles and generate a coherent, comprehensive report.
- Your key responsibility is to ensure accuracy and clarity of the report, catering to stakeholders such as researchers, analysts, and educators who require well-structured reports.

CORE CAPABILITIES:
- Analyze and extract relevant information from multiple articles in varied domains.
- Utilize domain-specific knowledge to enhance report quality in fields like technology, health, finance, etc.
- Use available tools such as summarization algorithms and language models to assist in report generation.

BEHAVIORAL GUIDELINES:
- Maintain a formal and precise communication style.
- Follow a logical flow when organizing content in the report.
- Handle ambiguity by providing additional context or clarification where necessary.
- Ensure ethical handling of information, avoiding bias and respecting intellectual property.

CONSTRAINTS & BOUNDARIES:
- Do not include personal opinions unless specified.
- Exclude content that violates privacy or security standards.
- Ensure the report does not exceed requested length parameters unless further details are specified.

SUCCESS CRITERIA:
- Deliver reports that are accurate, concise, and insightful.
- Meet quality standards by ensuring reports are free from grammatical errors and inconsistencies.
- Achieve high satisfaction from end-users by providing actionable insights and clarity in the reports.
<articles>
{{14.text}}
</articles>

## 存到一个页面里面
    - router 路由器， 分支 生成周报， 月报
    - add a router
    - 聚合bundle 
        text aggregate
    - source module
        rss 
    <article>
     <title>{{9.title}}</title>
     <description>{{9.description}}</description>
     <created>{{9.dateCreated}}</created>
    </article>
    
    - 添加一个OpenRouter
        - model claude
        - role user
        - content 提示词

    - notion 新建一个page
        - YC Report
        - 复制id, 右键连接
    - 添加一个notion  create a page
    - parent id
    - title YC Report
    - content
        type paragrah
        content choice messages content

## 导出

- 其实就是一个json格式的配置文件
- 修改工作流的名字叫YC Blog
- ... Explain flow 动画流程
- ... Export blueprint
- 新建scenario -》 倒入。

## 工作流计划任务设置

- 在指定的时间自动运行
- 新建scenario
- add module 
    http make a request
    钟表表示计划任务的设置
    at regular intervals
    15
    开始时间
    结束时间
    on demand 运行才会运行
    
## 获取网络数据
    - 修改url 为https://www.ycombinator.com
    - add a module 
        text parser html2text
    - 选择data
    - add  a module
    openrouter createChatCompletion
    - 改下scenario名字
    analyze company based on website homepage

## 准备一个后端应用
    - surrealdb

    SurrealDB 是一个现代化的云端原生数据库，它结合了SQL和NoSQL的优点，提供了灵活的数据模型支持，包括文档、图形、键值对等，并且内置了实时同步、版本控制及ACID事务支持等功能。

    http 方式操作数据库
    https://surrealist.app/

    - create new cloud instance
        makeautoflow.com
        free
    - create namespace
        app
    - create database
        make
    - 边栏authentication
    - + new system user
        admin
        123456
        owner
    - 回首页 connection with using http query
        复制命令 终端执行
        返回版本信息

    - 用户登陆
        - 创建一个新的工作流
        - http make a request
            - url https://makeautoflowcom-06b7d92rttosn6pes4k1m388h0.aws-use1.surreal.cloud/version
        - 运行模块
        - schedular ondemand
        https://makeautoflowcom-06b7d92rttosn6pes4k1m388h0.aws-use1.surreal.cloud/signin
        method post

        headers

        Accept
        application/json
    
        body

        raw application/json
        {
    "user": "admin",
    "pass":"123456"
}
        登陆成功

    - rename signin 保存一下工作流

    ### 存储提供的数据

    - add a module
        http request 
        report是一个表
        https://makeautoflowcom-06b7d92rttosn6pes4k1m388h0.aws-use1.surreal.cloud/key/report
        post
        
        - Accept application/json
        - Surreal-NS app
        - Surreal-DB make
        - Authorization Bearer {{1.data.token}}

        - 去到网站 explore 看到结果

### 配置工作流的输入参数

   -  重命名工作流
   save company report to surrealdb
   - 工作拦找到scenario inputs
    website required 
    content Text required multi-line

    - 运行， 需要提供website content
    - 提供一个 transform to JSON 格式化内容 安全性
    - body
        website 
        content JSON string


## 数据抓取
    http 模块(要判断)
    提取
    ajax headless 

    - 新增一个scenarios
    - http  make a request
        https://news.ycombinator.com/ 
    - 只想拿到title 审核
    - 正则网站
        regexr.com
        将网页源码放到里面
        <span class="titleline"><a href="([^"]+)">([^"]+)<\/a>
    - 添加一个module text parser
        - 填入正则
        - Global match

    ### 格式化
    - 修改正则，给匹配到的起个名字
    <span class="titleline"><a href="(?<url>[^"]+)">(?<title>[^"]+)<\/a>
    ?<url> 名字
    - 聚合成json 数据
    - add a note 
        json aggregate to json
    - 选择match pattern
    - 添加 Hack News 
        url
        title
    - 运行工作流
        output json 字符串

    ### web hook

    - 有点点击页面，添加一个节点
    - 选择web hook
    - 将http 定时 移到webhook 前面， 作为第一个
        add 得到一个地址
    - 最后面加一个节点
        status 200 JSON string
    - 完成爬虫api 调用

    ### 抓取不同页面的数据
    - 分页
    https://news.ycombinator.com/?p=2
    - 第一个web hook 
        Edit 打开高级选项
    - add data structure
        Hack News Params
        page
        number
    - 再打开http 节点
    - https://news.ycombinator.com/?p=

    ### 抓取需要经过浏览器渲染的数据 
    - http get 用不了
    - https://www.ycombinator.com/companies
    - 没有找到airbnb, 页面要运行才能
    - headless browser 
    - http://app.scrapingbee.com/
    