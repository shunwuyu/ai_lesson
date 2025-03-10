function reverseString(str) {
  return [...str].reduce((reversed, char) => char + reversed, '');
}