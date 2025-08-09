// src/todos/entities/todo.entity.ts
// 在 NestJS 中，DTO（数据传输对象）是用来定义请求体或响应的数据结构，
// 确保输入输出的格式一致性并帮助进行数据验证。
// 简而言之，DTO是用来规范API接口的数据格式的工具。
export class Todo {
    id: string;
    title: string;
    completed: boolean;
}
  