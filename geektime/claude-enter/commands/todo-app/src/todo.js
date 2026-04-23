/**
 * 待办事项业务逻辑模块
 */
import { readTodos, saveTodos } from './storage.js';

/**
 * 生成唯一ID
 * @returns {number} 唯一标识符
 */
function generateId() {
  const todos = readTodos();
  const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
  return maxId + 1;
}

/**
 * 添加待办事项
 * @param {string} title - 待办事项标题
 * @returns {Object|null} 创建的待办事项，失败返回 null
 */
export function addTodo(title) {
  if (!title || title.trim() === '') {
    console.log('❌ 标题不能为空');
    return null;
  }

  const todos = readTodos();
  const newTodo = {
    id: generateId(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  const saved = saveTodos(todos);

  if (saved) {
    console.log(`✅ 添加成功: "${newTodo.title}" (ID: ${newTodo.id})`);
    return newTodo;
  }
  return null;
}

/**
 * 删除待办事项
 * @param {number} id - 待办事项ID
 * @returns {boolean} 是否删除成功
 */
export function deleteTodo(id) {
  const todos = readTodos();
  const index = todos.findIndex(todo => todo.id === id);

  if (index === -1) {
    console.log(`❌ 未找到 ID 为 ${id} 的待办事项`);
    return false;
  }

  const deleted = todos.splice(index, 1)[0];
  const saved = saveTodos(todos);

  if (saved) {
    console.log(`🗑️  删除成功: "${deleted.title}"`);
    return true;
  }
  return false;
}

/**
 * 更新待办事项
 * @param {number} id - 待办事项ID
 * @param {string} newTitle - 新标题
 * @returns {boolean} 是否更新成功
 */
export function updateTodo(id, newTitle) {
  if (!newTitle || newTitle.trim() === '') {
    console.log('❌ 新标题不能为空');
    return false;
  }

  const todos = readTodos();
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log(`❌ 未找到 ID 为 ${id} 的待办事项`);
    return false;
  }

  todo.title = newTitle.trim();
  const saved = saveTodos(todos);

  if (saved) {
    console.log(`✏️  更新成功: "${todo.title}"`);
    return true;
  }
  return false;
}

/**
 * 切换待办事项完成状态
 * @param {number} id - 待办事项ID
 * @returns {boolean} 是否操作成功
 */
export function toggleTodo(id) {
  const todos = readTodos();
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    console.log(`❌ 未找到 ID 为 ${id} 的待办事项`);
    return false;
  }

  todo.completed = !todo.completed;
  const saved = saveTodos(todos);

  if (saved) {
    const status = todo.completed ? '已完成' : '未完成';
    console.log(`🔄 状态更新: "${todo.title}" -> ${status}`);
    return true;
  }
  return false;
}

/**
 * 查询所有待办事项
 * @returns {Array} 待办事项列表
 */
export function listTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log('📋 暂无待办事项');
    return [];
  }

  console.log('\n📋 待办事项列表:\n');
  todos.forEach(todo => {
    const status = todo.completed ? '✅' : '⬜';
    console.log(`  ${status} [${todo.id}] ${todo.title}`);
  });
  console.log('');

  return todos;
}

/**
 * 根据ID查询待办事项
 * @param {number} id - 待办事项ID
 * @returns {Object|null} 待办事项对象
 */
export function getTodoById(id) {
  const todos = readTodos();
  return todos.find(t => t.id === id) || null;
}
