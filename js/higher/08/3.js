function foo() {}

foo.constructor === Function // true
foo instanceof Function 

const foo = new Function();