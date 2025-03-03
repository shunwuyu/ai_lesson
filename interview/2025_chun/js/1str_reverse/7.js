function reverseString(str) {
  return [...str].map(char => char).reverse().join('');
}