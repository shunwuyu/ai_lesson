/**
 * TODO 控制台应用主入口
 */
import readline from 'readline';
import * as todo from './todo.js';

// 创建命令行接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 显示菜单
 */
function showMenu() {
  console.log('\n📝 TODO 控制台应用');
  console.log('=================');
  console.log('1. 查看所有待办事项');
  console.log('2. 添加待办事项');
  console.log('3. 删除待办事项');
  console.log('4. 更新待办事项');
  console.log('5. 标记完成/未完成');
  console.log('0. 退出');
  console.log('=================');
}

/**
 * 获取用户输入
 * @param {string} question - 提示信息
 * @returns {Promise<string>} 用户输入
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * 主循环
 */
async function main() {
  while (true) {
    showMenu();
    const choice = await askQuestion('请选择操作 (输入数字): ');

    switch (choice.trim()) {
      case '1':
        todo.listTodos();
        break;

      case '2':
        const title = await askQuestion('请输入待办事项标题: ');
        todo.addTodo(title);
        break;

      case '3':
        todo.listTodos();
        const deleteId = await askQuestion('请输入要删除的ID: ');
        todo.deleteTodo(parseInt(deleteId));
        break;

      case '4':
        todo.listTodos();
        const updateId = await askQuestion('请输入要更新的ID: ');
        const newTitle = await askQuestion('请输入新标题: ');
        todo.updateTodo(parseInt(updateId), newTitle);
        break;

      case '5':
        todo.listTodos();
        const toggleId = await askQuestion('请输入要切换状态的ID: ');
        todo.toggleTodo(parseInt(toggleId));
        break;

      case '0':
        console.log('\n👋 再见！\n');
        rl.close();
        return;

      default:
        console.log('❌ 无效的选择，请重新输入');
    }

    // 等待用户按回车继续
    await askQuestion('\n按回车键继续...');
  }
}

// 启动应用
console.log('\n欢迎使用 TODO 应用！');
main().catch(error => {
  console.error('程序出错:', error);
  rl.close();
  process.exit(1);
});
