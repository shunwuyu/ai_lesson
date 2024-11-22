function* count() {
  yield 9;
  yield 8;
  yield 7;
}

const it = count();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());