function isValid(s) {
    if (s.length % 2 !== 0) return false; // 奇数长度直接 false

    const stack = [];
    const mapping = {
        '(': ')',
        '{': '}',
        '[': ']'
    };

    for (const char of s) {
        if (char in mapping) {
            stack.push(mapping[char]); // 直接压入预期的右括号
        } else {
            if (stack.pop() !== char) return false;
        }
    }

    return stack.length === 0;
}
