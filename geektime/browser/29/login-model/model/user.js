// 简单用户验证（实际应查数据库+密码哈希）
export function authenticate(username, password) {
  return username === 'admin' && password === '123456';
}