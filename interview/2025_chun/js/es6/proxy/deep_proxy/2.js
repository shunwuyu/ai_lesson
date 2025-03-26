const user = {
    name: 'John',
    profile: {
        age: 30
    }
};

const handler = {
    get(target, property) {
        console.log(`Accessing property: ${property}`);
        const value = target[property];
        if (typeof value === 'object' && value !== null) {
            return new Proxy(value, handler);
        } else {
            return value;
        }
    }
};

const proxy = new Proxy(user, handler);

console.log(proxy.name); // 输出: Accessing property: name, John
console.log(proxy.profile.age); // 输出: 
// Accessing property: profile
// Accessing property: age, 30