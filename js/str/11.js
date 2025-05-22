function reverseString(str) {
    return str.split('').reverse().join('');
}

// 示例用法
const original = "hello";
const reversed = reverseString(original);

console.log(reversed); 