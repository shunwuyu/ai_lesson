# MCP 

## 基于和风天气API封装MCP 三大组件

### 什么是mcp?
1.png 2.png
模型上下文协议（MCP）是一个标准化接口和框架，AI 模型与外部工具、资源和环境无缝交互。它就像 USB-C 一样，为 AI 系统提供了连接各种功能的通用连接器。

一个AI 应用怎么接入呢？
通过mcp 协议， 有一些web api, 有些即时通讯工具， 本地文件系统， 数据库， 代码库， 邮件....

## 为什么需要mcp?
Function Tools 就像你跟 AI 说：
“我这有把螺丝刀，你需要的时候可以用一下。”——只解决怎么用工具。

MCP：标准插槽，谁来都能插、随时换、还能扩展 

Function Tools 能用，MCP 才能规模化、工程化地用。

### MCP HCS 架构
4.png 
- mcp-server
  能力提供者， 向外暴露工具、资源和接口（如文件、数据库、自动化能力）。
  playwright-mcp 

- mcp-client (deepseek)
  调用方，负责发现并调用 mcp-server 的能力，获取结果。
  手机上的 App
  Cursor 内置的 AI 助手

- mcp-host (使用)
  cursor 手机系统
  承载与调度环境（如 IDE、AI 应用），管理多个 client 与 server 的连接、权限与生命周期（配置规则）。

### MCP 调用流程
5.png
分成三大部分
- 用户发起了请求（AI HOST 内嵌了MCP client），llm 判断是否需要选择工具，如果不需要，直接返回结果。如果需要选择工具，mcp client 发起请求（人工介入），是否允许它自主决策， 发起请求到mcp-server,执行真正的工具调用（api, 本地文件系统， 数据库），结果返回给大语言模型， 整合调用结果和查询信息， 返回给用户

## 天气服务mcp-server
包含两个工具
- get_weather_warning
  灾害预警查询工具
  支持城市 ID 或经纬度定位
  返回实时气象灾害预警信息
  包含预警等级、类型与时效
- get_daily_forecast
  多日天气预报工具
  支持 3/7/10/15/30 日预报周期
  逐日体感摘要：日出日落、温度区间
  详细指标：风力、湿度、紫外线、能见度


