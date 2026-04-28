function parseUrlQuery(queryStr) {
    // 1. 初始化结果对象
    const result = {};
  
    // 2. 去掉开头的 ?（如果有）
    const cleanStr = queryStr.startsWith('?') ? queryStr.slice(1) : queryStr;
  
    // 3. 按 & 切割成 key=value 数组
    const keyValuePairs = cleanStr.split('&');
  
    // 4. 遍历每一对参数
    for (const pair of keyValuePairs) {
      // 空项跳过
      if (!pair) continue;
  
      // 5. 按 = 切割 key 和 value（只切割第一个=）
      // &token&test
      const equalIndex = pair.indexOf('=');
      const key = equalIndex !== -1 ? pair.slice(0, equalIndex) : pair;
      const value = equalIndex !== -1 ? pair.slice(equalIndex + 1) : '';
  
      // ====================== 处理1：URL解码 ======================
      const decodedValue = decodeURIComponent(value);
  
      // ====================== 处理2：嵌套key提取 ======================
      const matched = key.match(/^.+\[(.+)\]$/);
      const finalKey = matched ? matched[1] : key;
  
      // ====================== 处理3：同名参数转数组 ======================
      if (result[finalKey] === undefined) {
        result[finalKey] = decodedValue;
      } else {
        result[finalKey] = [].concat(result[finalKey], decodedValue);
      }
    }
  
    return result;
  }
  
  // ========== 测试调用 ==========
  const urlParams = `?name=john&age=30&hobbies=run&hobbies=dance&location[city]=new%20work`;
  const res = parseUrlQuery(urlParams);
  console.log(res);