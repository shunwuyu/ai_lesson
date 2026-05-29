/**
 * 数据存储模块 - 负责读写 JSON 文件
 */
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'todos.json');

// 确保数据目录存在
const DATA_DIR = path.dirname(DATA_FILE);
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * 读取所有待办事项
 * @returns {Array} 待办事项列表
 */
export function readTodos() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('读取数据失败:', error.message);
    return [];
  }
}

/**
 * 保存所有待办事项
 * @param {Array} todos - 待办事项列表
 */
export function saveTodos(todos) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('保存数据失败:', error.message);
    return false;
  }
}
