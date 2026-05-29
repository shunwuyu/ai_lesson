function extractBirthdayFromIdCard(id) {
    // 假设是18位身份证
    const birthday = id.slice(6, 14); // 第7位到14位
    return `${birthday.slice(0, 4)}-${birthday.slice(4, 6)}-${birthday.slice(6, 8)}`;
  }
  
  console.log(extractBirthdayFromIdCard("110105199003072018")); 
  // 输出: 1990-03-07
  