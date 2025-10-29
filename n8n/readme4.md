# table 

- create table news 
- 添加字段 title, url
- 添加一个工作流
    - 开始节点
    - rss 节点
    https://techcrunch.com/feed/
    - filter
    pubDate is after or equal to 
    $now.minus(8, 'hours')
    - data table 
    insert row
    选择table, 拖
    - 重复执行， 不是我们想要的
        - 在filter后面加上 data table
            - if row does not exist 
                拖过来link
        - 在filter 后面加上 if row exists
            条件 url 
            - 添加data table  update rows 