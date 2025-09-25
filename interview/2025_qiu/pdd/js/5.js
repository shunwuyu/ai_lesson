const Person = (name) => {
    this.name = name;
};

// 尝试用 new 调用箭头函数
new Person("Alice");

// 报错信息：
// TypeError: Person is not a constructor