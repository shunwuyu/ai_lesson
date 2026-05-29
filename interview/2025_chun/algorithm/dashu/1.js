/**
 * 大数相加
 * @param {string} num1 - 第一个大数（字符串形式）
 * @param {string} num2 - 第二个大数（字符串形式）
 * @returns {string} - 两个大数的和（字符串形式）
 */
function addLargeNumbers(num1, num2) {
    let result = ''; // 存储结果
    let carry = 0;   // 进位
    let i = num1.length - 1; // num1 的索引
    let j = num2.length - 1; // num2 的索引

    // 从后向前逐位相加
    while (i >= 0 || j >= 0 || carry > 0) {
        const digit1 = i >= 0 ? parseInt(num1[i]) : 0; // 获取 num1 当前位数字
        const digit2 = j >= 0 ? parseInt(num2[j]) : 0; // 获取 num2 当前位数字

        // 计算当前位的和
        const sum = digit1 + digit2 + carry;
        carry = Math.floor(sum / 10); // 计算进位
        result = (sum % 10) + result; // 当前位的结果

        i--; // 移动到 num1 的前一位
        j--; // 移动到 num2 的前一位
    }

    return result; // 返回最终结果
}

// 使用示例
const num1 = "123456789012345678901234567890";
const num2 = "987654321098765432109876543210";
const sum = addLargeNumbers(num1, num2);
console.log(sum); // 输出: "1111111110111111111011111111100"