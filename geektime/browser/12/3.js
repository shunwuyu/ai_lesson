let jack = {
  name: "jack.ma",
  age: 40,
  like: {
      dog: {
          color: 'black',
          age: 3,
      },
      cat: {
          color: 'white',
          age: 2
      }
  }
};

function copy(src) {
  // 处理 null 或非对象类型（包括基本类型和函数等）
  if (src === null || typeof src !== 'object') {
      return src;
  }

  // 处理数组
  if (Array.isArray(src)) {
      let dest = [];
      for (let i = 0; i < src.length; i++) {
          dest[i] = copy(src[i]);
      }
      return dest;
  }

  // 处理普通对象
  let dest = {};
  for (let key in src) {
      if (src.hasOwnProperty(key)) {
          dest[key] = copy(src[key]);
      }
  }
  return dest;
}

let jack2 = copy(jack);

// 修改拷贝后的对象
jack2.like.dog.color = 'green';

console.log(jack.like.dog.color);  // 输出: "black" ✅
console.log(jack2.like.dog.color); // 输出: "green"