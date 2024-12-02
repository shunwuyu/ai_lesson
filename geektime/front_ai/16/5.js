function generateRandomTime() {    
  const date = new Date();    
  date.setHours(Math.floor(Math.random() * 24));    
  date.setMinutes(Math.floor(Math.random() * 60));    
  date.setSeconds(Math.floor(Math.random() * 60));    
  // 用于将日期转换为 ISO 8601 格式的字符串。ISO 8601 是一种国际标准的日期和时间表示格式，它通常被写作为 YYYY-MM-DDTHH:mm:ss.sssZ
  return date.toISOString();
}

console.log(generateRandomTime());