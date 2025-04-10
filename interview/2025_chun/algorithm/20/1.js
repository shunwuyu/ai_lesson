function isValid(s) {
    const stack = [];
    const mapping = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (let char of s) {
        if (mapping[char]) {
            // 左括号入栈
            stack.push(char);
        } else {
            // 右括号匹配
            if (stack.length === 0 || mapping[stack.pop()] !== char) {
                return false; // 不匹配
            }
        }
    }

    return stack.length === 0; // 栈为空则有效
}