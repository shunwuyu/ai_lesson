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