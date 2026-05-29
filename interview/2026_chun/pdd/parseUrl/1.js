function parseUrlQuery(queryStr) {
    // 1. 初始化结果对象
    const result = {};
  
    // 2. 使用URLSearchParams解析参数（自动处理&分隔）
    // 自动拆分键值对
    const params = new URLSearchParams(queryStr);
    // [object URLSearchParams] 内置可迭代对象
    console.log(Object.prototype.toString.call(params));
    console.log(params);
    // 3. 遍历所有参数键值对
    // 普通json 对象不可以for of 
    // 把对象自身键值对转为[键,值]二维数组，从而支持 for...of 遍历
    // for(const [k,v] of Object.entries(obj)){} 
    for (const [key, value] of params) {
      // ====================== 处理1：URL解码（%20 → 空格）======================
      const decodedValue = decodeURIComponent(value);
  
      // ====================== 处理2：提取嵌套key（location[city] → city）======================
      const matched = key.match(/^.+\[(.+)\]$/); // 正则匹配 [xxx]
      // 匹配失败直接返回 null
      const finalKey = matched ? matched[1] : key;
  
      // ====================== 处理3：同名参数转数组（hobbies=run&hobbies=dance）======================
      if (result[finalKey] === undefined) {
        // 第一次出现，直接赋值
        result[finalKey] = decodedValue;
      } else {
        // 已存在，转为数组并追加
        result[finalKey] = [].concat(result[finalKey], decodedValue);
      }
    }
  
    // 4. 返回最终结果
    return result;
  }
  
  // ========== 测试调用 ==========
  const urlParams = `?name=john&age=30&hobbies=run&hobbies=dance&location[city]=new%20work`;
  const res = parseUrlQuery(urlParams);
  console.log(res);