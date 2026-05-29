
/**
 * 查找所有非活跃用户
 * @param users 用户列表
 * @returns {User[]} 非活跃用户列表
 */   
async function getActiveUsers(users) {
    const activeUsers = await users.filter(user => user.status === 'ACTIVE');
    return activeUsers;
}           
