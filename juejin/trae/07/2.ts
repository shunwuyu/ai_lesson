/**
 * 根据邮箱获取用户信息
 * @param email 用户邮箱
 * @param users 用户列表
 * @returns {User} 用户对象
 */
async function getUser(email: string, users: User[]) {
  const user = await users.find(user => user.email === email);
  if (!user) {
    throw new Error('未找到用户');
  }
  return user;
}

// 函数调用
getUser('123@qq.com', []);