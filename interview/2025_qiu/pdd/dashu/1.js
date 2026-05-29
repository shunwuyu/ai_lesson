function addBigNumbers(num1, num2) {
  // 将两个数字字符串反转，方便从低位到高位逐位相加
  let arr1 = num1.split('').reverse();
  let arr2 = num2.split('').reverse();
  let result = []; // 存储结果
  let carry = 0; // 进位

  // 遍历较长的数组
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    // 获取当前位的数字，如果不存在则默认为 0
    const digit1 = arr1[i] ? parseInt(arr1[i]) : 0;
    const digit2 = arr2[i] ? parseInt(arr2[i]) : 0;

    // 计算当前位的和（包括进位）
    const sum = digit1 + digit2 + carry;

    // 计算当前位的结果和新的进位
    result.push(sum % 10);
    carry = Math.floor(sum / 10);
  }

  // 如果最后还有进位，添加到结果中
  if (carry > 0) {
    result.push(carry);
  }

  // 将结果反转并转换为字符串
  return result.reverse().join('');
}

const num1 = '12345678901234567890';
const num2 = '98765432109876543210';
console.log(addBigNumbers(num1, num2)); 