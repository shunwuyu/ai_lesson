/**
 * 测试文件 - 验证 TODO 应用功能
 */
import * as todo from './todo.js';
import fs from 'fs';
import path from 'path';

const TEST_DATA_FILE = path.join(process.cwd(), 'data', 'todos.json');

// 清空测试数据
function clearTestData() {
  if (fs.existsSync(TEST_DATA_FILE)) {
    fs.unlinkSync(TEST_DATA_FILE);
  }
}

// 运行测试
function runTests() {
  console.log('🧪 开始运行测试...\n');

  clearTestData();

  // 测试1: 添加待办事项
  console.log('测试1: 添加待办事项');
  todo.addTodo('学习 Node.js');
  todo.addTodo('完成 TODO 项目');
  console.log('');

  // 测试2: 查看列表
  console.log('测试2: 查看列表');
  todo.listTodos();
  console.log('');

  // 测试3: 更新待办事项
  console.log('测试3: 更新待办事项');
  const todos = todo.listTodos();
  if (todos.length > 0) {
    todo.updateTodo(todos[0].id, '深入学习 Node.js');
  }
  console.log('');

  // 测试4: 切换完成状态
  console.log('测试4: 切换完成状态');
  const updatedTodos = todo.listTodos();
  if (updatedTodos.length > 0) {
    todo.toggleTodo(updatedTodos[0].id);
  }
  console.log('');

  // 测试5: 删除待办事项
  console.log('测试5: 删除待办事项');
  const allTodos = todo.listTodos();
  if (allTodos.length > 0) {
    todo.deleteTodo(allTodos[0].id);
  }
  console.log('');

  // 测试6: 边界情况
  console.log('测试6: 边界情况测试');
  todo.addTodo(''); // 空标题
  todo.deleteTodo(9999); // 不存在的ID
  todo.updateTodo(9999, 'test'); // 更新不存在的ID
  console.log('');

  console.log('✅ 所有测试完成！\n');

  // 显示最终状态
  console.log('最终数据状态:');
  todo.listTodos();

  // 清理测试数据
  clearTestData();
  console.log('测试数据已清理\n');
}

runTests();
