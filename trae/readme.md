[source](https://www.trae.com.cn/?utm_source=juejin&utm_medium=juejin_resources&utm_campaign=all_header_17)

## AI 工程师
https://www.trae.com.cn/
- 不是传统程序员 
- 以智能生产力为核心(LLM DeepSeek)
- 将AI融入开发流程 (切页面，写代码，写注释，上线)
- coder copilot 
  默契配合，更高质量、高效率完成每一个任务

## chrome 插件
  - 安装chrome 
  https://www.google.cn/intl/zh-CN_ALL/chrome/fallback/
  - hulk pormpt 概念
  - 了解流程 
  - 写注释， 读懂代码
  - 提出修改弹窗大小的需求

## prompt 
  grok/demo/main.mjs
  "openai": "^4.71.1"
  const openai = new OpenAI({
  apiKey:'',
  // 国内转发
  baseURL: 'https://api.siliconflow.cn/v1'
});

## nlp
https://www.modelscope.cn/home
 魔搭社区
 ModelScope旨在打造下一代开源的模型即服务共享平台,为泛AI开发者提供灵活
 易用、低成本的一站式模型服务产品,让模型应用更简单。
 pipeline 管道
from modelscope.pipelines import pipeline
 常量
from modelscope.utils.constant import Tasks
 文本分类任务 
 达摩院  支持中文的情感分类模型
semantic_cls = pipeline(Tasks.text_classification, 'damo/nlp_structbert_sentiment-classification_chinese-base')
 result = semantic_cls(input='shut up')
 result = semantic_cls(input='thank you')
semantic_cls(input='遥遥领先')
semantic_cls(input='友商是傻逼')

## JS + Python AI 

## 前端基础
https://github.com/bradtraversy/50projects50days/blob/master/expanding-cards/style.css

## 安装环境
- https://nodejs.org/zh-cn
