const obj1 = { a: 1, b: 2, c: 1 };
const obj2 = { a: 1, b: 3, c: 2 };

function diff(obj1, obj2) {
    const result = {};
  
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  
    for (const key of keys) {
      const val1 = obj1[key];
      const val2 = obj2[key];
  
      if (val1 !== val2) {
        result[key] = {
          oldValue: val1,
          newValue: val2,
        };
      }
    }
  
    return result;
  }
  

console.log(diff(obj1, obj2));

