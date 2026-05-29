function isValidBrackets(s) {
    const stack = [];
    const map = {
      ')': '(',
      ']': '[',
      '}': '{'
    };
    for (let char of s) {
      if (['(', '[', '{'].includes(char)) {
        stack.push(char);
      } else if ([')', ']', '}'].includes(char)) {
        if (stack.pop() !== map[char]) return false;
      }
    }
    return stack.length === 0;
  }
  
  console.log(isValidBrackets("{[()]}")); // true
  console.log(isValidBrackets("{[(])}")); // false
  