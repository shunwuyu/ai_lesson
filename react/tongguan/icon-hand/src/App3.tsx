interface Person {
  name: string;
  age: number;
}
// 希望创建一个函数，允许部分更新一个人的信息 
function updatePersonInfo(person: Person, updates: Partial<Person>): Person {
  return { ...person, ...updates };
}

const person: Person = { name: "张三", age: 30 };
const updatedPerson1 = updatePersonInfo(person, { name: "李四" });
console.log(updatedPerson1);

const updatedPerson2 = updatePersonInfo(person, { age: 35 });
console.log(updatedPerson2); // 输出: { name: "张三", age: 35 }

// 不更新任何信息
const updatedPerson3 = updatePersonInfo(person, {});
console.log(updatedPerson3); // 输出: { name: "张三", age: 30 }

const App = () => {
  return (<>
  1111
  </>)
};

export default App