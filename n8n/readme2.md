# n8n
  https://n8n.io/
- n8n 是一个帮你自动化一切的工具。
- 你有没有这种感觉：每天都在重复相同的操作？
  - 听说图书馆的座位要预约了
    女神对面的座位总是难约。
  - 每晚都要给对象打电话，室友振聋发聩的呼噜声是你在寝室的最好证明？
  - 千篇一律的数据库CRUD(增删改查)
  - 在多个招聘平台找实习岗位
  本来应该从从荣荣游刃有余，现在是匆匆忙忙，连滚带爬。
  n8n 能定时爬取多个招聘网站的 API， 筛选“AI 前端”“远程实习”等关键词。
  自动汇总成一份日报，通过邮件或微信发送给你。
  如果发现“心仪公司”发布岗位，立刻推送手机通知

## 2025 是AI Agent 元年
  AI Agent 是能自主感知（LLM）、决策并执行任务的智能体，像“数字员工”一样为你自动完成复杂工作。
  - 满大街的机器人可能就在未来的5-6年
  - 肖崇康同学 远程coze 实习去了字节

## 安装与运行
  - 基于node.js  js后端环境 
  npm i -g n8n
  - npx n8n 运行命令
    开源工作流自动化平台 http://localhost:5678/home/workflows
  - 创建第一个工作流 
    右上角 create workflow
  - api 
    https://api.restful-api.dev/objects
    数据处理和节点使用的入门
    包含各个手机品牌 id, name, 和一些具体的参数数据
    但是数据不规则， 比如有的data null, 有的有价格，有的没有， id 6 generation 字段不一致，这时候需要使用到 n8n 提供的节点来处理数据（清洗）。
  - 触发器 trigger
    每个工作流都需要一个触发器才能运行，点击。 工作流手动触发
    trigger manual 手动触发
    定时触发 每晚要给对象发首情诗 
  - 点击执行工作流， 什么都不会做
  - 添加一个HTTP Request节点 
    基于节点的可视化界面
    填入url 
    节点重命名 Products API
    运行节点， 右侧输出信息
  - 清理， 格式化输出
    添加Edit Fields
    id, name, price 三个字段
    拖拽id 字段 execute 
    还有 name, price 
    data.price 改成 price
    节点重命名 Clean Up JSON Data
  - 将工作流改名为Product Data Clean Up 
    意义， 把处理过后的数据给领导 
  - 过滤所有价格为null 的产品
    添加一个Filter 节点 
    拖拽price string is not empty
    重命名为 Remove Null Price
  - 将价格转为浮点数
    添加一个DataTransform 节点 
    将id, name, price 都拖入， price 类型改为number 
    重命名为 Price to Float 
  - 求所有产品价格的总和
    添加一个summarize 节点
    选择Sum
    将price字段拉取到field 
    再加一个count 
    将name 字段拉取进来
  
原来的数据处理工作excel， 后来进化到写代码运行， 现在n8n 搭建工作流自动化处理

  从Excel手动处理，到编写代码提升效率，再到利用n8n构建可视化工作流，数据处理经历了从重复劳动到灵活编程、再到自动化集成的演进。这不仅是工具的升级，更是思维的转变

  AI降低技术门槛，提升协作效率，让自动化真正赋能业务，实现端到端的流程智能化。


## AI 能力

- 新建一个新工作流，命名为Simple Chatbot
- 选择chat trigger节点
  hello
- 添加AI节点
  openai
  message a model
  选择moonshot
  Mode By ID kimi-k2-0905-preview
  改名字为 Message to GPT 4o
- 新增一条系统消息
  system
  You are a chinese.No matter what language you receive,you always response with chinese.
- 新增一条用户消息
  user
  拖拽chatInput用户输入

