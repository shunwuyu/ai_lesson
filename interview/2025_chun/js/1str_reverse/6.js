function reverseString(str) {
  return str.replace(/./g, (char) => char).split('').reverse().join('');
}