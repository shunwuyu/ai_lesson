# SDD 

Specification-Driven Development

规范驱动开发

SDD核心思想是“规范先行”。将规范作为唯一权威源头，由AI驱动生成代码，消除意图与实现的鸿沟。

## 框架

- GitHub Spec-Kit
  Github 官方出品，重流程重合规。
- OpenSpec
  轻量极简，主打增量迭代。

## OpenSpec

OpenSpec 是一个轻量级的「规范驱动开发（SDD）」框架，让你和 AI 编码助手在写代码前先用结构化的 spec 和变更提案锁定需求，避免 AI 凭聊天上下文瞎猜、做到一半才发现方向错了。

npm install -g @fission-ai/openspec@latest

### todos

帮我用nestjs 生成一个项目todos-api, 只需要初始化项目就好.
openspec init 选择claude 
@openspec/specs/todo-management/requirements.md
```
# Todo Management

## Goal

提供一个 Todo 管理系统。

## User Story

作为用户，我希望能够：

- 创建 Todo
- 查看 Todo
- 完成 Todo
- 删除 Todo

## Acceptance Criteria

### 创建 Todo

Given 用户输入标题

When 调用创建接口

Then 返回新的 Todo

### 查看 Todo

返回全部 Todo。

### 完成 Todo

能够修改 completed 状态。

### 删除 Todo

能够删除指定 Todo。
```

```
根据 @openspec/specs/todo-management/requirements.md 生成设计文档
```
选 仅design.md
spec目录下

```
根据 @openspec/specs/todo-management/requirements.md                     
  @openspec/specs/todo-management/design.md  生成开发任务。 
```

把TodosModule 创建调整到第一个任务吧, 修改下                             
  @openspec/specs/todo-management/tasks.md


完成任务 7：运行格式化、Lint 与全量测试
  @openspec/specs/todo-management/requirements.md         
  需求文档, @openspec/specs/todo-management/design.md
  技术文档 @openspec/specs/todo-management/tasks.md
  只完成任务7

## 加上  redis
存入redis
把它当成一次新的需求变更（Change），让 AI 根据规格更新设计、任务，再生成 NestJS 代码。这才是 OpenSpec 的典型工作流。

修改功能，不修改旧 Spec，而是创建新的 Change。

```
创建一个新的 OpenSpec Change，为 Todo 添加 Redis 持久化能力。
```
添加新的 在changes目录下

```
# Todo Redis Storage

## Why

当前 Todo 数据保存在内存中。

服务重启后数据会丢失。

需要使用 Redis 保存 Todo。

## Goal

让 Todo 持久化到 Redis。

## Non Goal

- 不增加用户系统
- 不增加权限管理

生成design.md
再生成 tasks.md
再那啥
```


