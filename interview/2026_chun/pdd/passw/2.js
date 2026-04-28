function generateStrongPwd() {
    // 1. 拆分三类必选字符集
    const lower = 'abcdefghijklmnopqrstuvwxyz'; // 小写
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 大写
    const number = '0123456789';                // 数字
    // 混合总字符集
    const all = lower + upper + number;
  
    // 2. 先各自必取一位，保证密码强度
    let pwd = '';
    // 随机取1位小写
    pwd += lower[Math.floor(Math.random() * lower.length)];
    // 随机取1位大写
    pwd += upper[Math.floor(Math.random() * upper.length)];
    // 随机取1位数字
    pwd += number[Math.floor(Math.random() * number.length)];
  
    // 3. 还差 5位，从全部字符随机补全
    for (let i = 0; i < 5; i++) {
      const idx = Math.floor(Math.random() * all.length);
      pwd += all[idx];
    }
  
    // 4. 打乱顺序（避免前三位固定：小、大、数）
    // 字符串转数组打乱再拼接
    // 先切割为数组，然后打乱，然后拼接为字符串
    // 用随机正负值打乱数组元素顺序，实现随机乱序效果。
    return pwd.split('').sort(() => 0.5 - Math.random()).join('');
  }
  
  // 测试
  console.log(generateStrongPwd());