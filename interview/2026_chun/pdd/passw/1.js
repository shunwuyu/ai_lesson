function generatePassword() {
    // 1. 定义字符集：大小写字母 + 数字
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    // 2. 循环 8 次，每次随机取一个字符
    for (let i = 0; i < 8; i++) {
        // Math.random()取 0~1 随机小数 
        //  Math.floor 向下取整
        // 0 ~ length -1
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    // 3. 返回结果
    return password;
}

console.log(generatePassword());