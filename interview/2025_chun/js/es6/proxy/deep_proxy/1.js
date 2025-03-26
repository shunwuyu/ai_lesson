const user = {
    name: 'John',
    profile: {
        age: 30
    }
};
const handler = {
    get(target, property) {
        console.log(`Accessing property: ${property}`);
        return target[property];
    }
};
const proxy = new Proxy(user, handler);

console.log(proxy.name); 
// 打印 Accessing property: profile  
// 而不是 Accessing property: age
console.log(proxy.profile.age); 
// 打印 Accessing property: age
