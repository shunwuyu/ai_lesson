## ADDED Requirements

### Requirement: Todo 数据持久化

系统 SHALL 将 Todo 数据持久化到 Redis，使创建、更新、删除操作的结果在服务重启后仍然保留。

#### Scenario: 创建后重启数据保留

- **WHEN** 用户创建一个 Todo 且服务随后重启
- **THEN** 该 Todo 仍可通过查看全部 Todo 接口获取

#### Scenario: 更新后重启状态保留

- **WHEN** 用户完成一个 Todo 且服务随后重启
- **THEN** 该 Todo 的 `completed` 状态仍为更新后的最新值

#### Scenario: 删除后重启数据不再出现

- **WHEN** 用户删除一个 Todo 且服务随后重启
- **THEN** 该 Todo 不再出现在查看全部 Todo 的结果中
