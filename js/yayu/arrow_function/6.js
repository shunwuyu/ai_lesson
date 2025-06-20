class Parent {
    greet() {
        return 'Hello from Parent';
    }
}
  
class Child extends Parent {
    greet() {
      return super.greet() + ' and Child';
    }
}
  
  const c = new Child();
  console.log(c.greet()); // "Hello from Parent and Child"
  