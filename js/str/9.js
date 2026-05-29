function isValidParentheses(s) {
    const stack = []; // 创建一个栈用于存储左括号

    // 遍历字符串中的每个字符
    for (let char of s) {
        // 如果字符是左括号，压入栈中
        if (char === '(') {
            stack.push(char);
        } 
        // 如果字符是右括号
        else if (char === ')') {
            // 如果栈为空，说明没有匹配的左括号，返回 false
            if (stack.length === 0) return false;
            // 弹出栈顶的左括号，表示找到了一对匹配的括号
            stack.pop();
        }
    }
    // 如果栈为空，说明所有的括号都匹配，返回 true；否则返回 false
    return stack.length === 0;
}
  
console.log(isValidParentheses("()"));        // true
console.log(isValidParentheses("(()())"));    // true
console.log(isValidParentheses("(()"));       // false
console.log(isValidParentheses(")("));        // false
  