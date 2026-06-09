// interface User {
//   email: string;
//   status: string;
//   // 其他用户字段省略
// }

async function getUserByEmail(email: string, users: User[]) {
  const user = await users.find(user => user.email === email);
  if (!user) {
    throw new Error('未找到用户');
  }
  return user;
}

/**
 * 查找所有非活跃用户
 * @param users 用户列表
 * @returns {User[]} 非活跃用户列表
 */
async function getInactiveUsers(users: User[]) {
  const inactiveUsers = await users.filter(user => user.status === 'ACTIVE');
  return inactiveUsers;
}