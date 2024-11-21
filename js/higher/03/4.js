// 定义一个函数
function greet(name) {
    return `Hello, ${name}!`;
}

// 为函数添加属性
greet.language = 'English';

// 为函数添加方法
greet.greetInSpanish = function(name) {
    return `Hola, ${name}!`;
};

// 调用函数
console.log(greet('Alice')); // 输出: Hello, Alice!

// 访问函数的属性
console.log(greet.language); // 输出: English

// 调用函数的方法
console.log(greet.greetInSpanish('Bob')); // 输出: Hola, Bob!

// 函数作为参数传递
function invokeGreeting(greetingFunction, name) {
    return greetingFunction(name);
}

console.log(invokeGreeting(greet, 'Charlie')); // 输出: Hello, Charlie!
console.log(invokeGreeting(greet.greetInSpanish, 'David')); // 输出: Hola, David!

// 函数作为返回值
function getGreetingFunction(language) {
    if (language === 'English') {
        return greet;
    } else if (language === 'Spanish') {
        return greet.greetInSpanish;
    }
}

const englishGreet = getGreetingFunction('English');
const spanishGreet = getGreetingFunction('Spanish');

console.log(englishGreet('Eve')); // 输出: Hello, Eve!
console.log(spanishGreet('Frank')); // 输出: Hola, Frank!