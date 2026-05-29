const obj = {
    name: 'John',
    age: undefined,
    job: 'Developer'
};
  
const copy = JSON.parse(JSON.stringify(obj));
console.log(copy); // { name: 'John', job: 'Developer' }
  // age属性因为值为undefined被完全忽略了