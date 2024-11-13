var person = {
  type: '人类'
}

var man = Object.create(person)
man.name = '戴佑圣'
man.age = 17
man.sex = '男'
main.eating = function () {
  console.log('我在吃饭');
}
// for(let key in man) {
//   console.log(key, man[key]);
// }

for (let key in man) {
  if (man.hasOwnProperty(key) && typeof man[key] !== 'function') {
    console.log(key, man[key]);
  }
}