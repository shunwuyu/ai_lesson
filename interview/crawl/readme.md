# 爬取数据

- x-crawl
x-crawl 是一个灵活且功能强大的 Node.js 多功能爬虫库，支持页面、接口和文件的抓取，并集成了 AI 辅助功能以智能应对反爬机制和优化爬取策略。

- 爬取流程
1. http 请求得到html
2. 正则 后端
3. css querySelector 
    内存中， 将html 字符串渲染为dom 树， x-crawl 支持在内存DOM树中使用querySelector 语法来查找。
4. AI 辅助
    用prompt 去描述我们需要的内容, AI可以代替我们和内存DOM 树沟通

- Puppeteer 无头浏览器
