const regex = /\Bto\B/g;
const str = "today is too hot to go out to eat";
const matches = str.match(regex);

console.log(matches);  // 输出: [ 'to', 'to' ]
