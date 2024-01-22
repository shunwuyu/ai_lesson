// 模拟用户模型，实际开发中需要使用数据库进行数据读写操作
const users = [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'test', password: 'test456' }
  ];
  
  module.exports = {
    // 根据用户名查询用户
    async findByUsername(username) {
      return users.find(user => user.username === username);
    }
  };
  