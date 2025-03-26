// 构造函数继承
// 父类
function Animal(name) {
    this.name = name;
    this.eat = function() {
        console.log(`${this.name} is eating`);
    };
}

// 子类
function Dog(name, breed) {
    // 调用父类构造函数，将this指向Dog实例
    Animal.call(this, name);
    
    // Dog特有的属性
    this.breed = breed;
    this.bark = function() {
        console.log(`${this.name} (${this.breed}) is barking`);
    };
}

// 使用示例
const myDog = new Dog('Max', 'Golden Retriever');
myDog.eat();    // "Max is eating"
myDog.bark();   // "Max (Golden Retriever) is barking"