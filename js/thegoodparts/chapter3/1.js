var obj = {
  name: '戴佑圣',
  age: 17,
  sex: '男',
  eating: function () {
    console.log('我在吃饭');
  }
}

// for(let key in obj) {
//   console.log(key, obj[key]);
// }

// 排除 function 

for(let key in obj) {
  if(typeof obj[key]!== 'function') {
    console.log(key, obj[key]);
  }
}