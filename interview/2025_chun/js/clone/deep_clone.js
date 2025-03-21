// 测试对象
const originalObj = {
    name: 'John',
    age: 30,
    address: {
        city: 'Beijing',
        street: 'Wangfujing'
    },
    hobbies: ['reading', { type: 'sports', name: 'swimming' }],
    friend: { name: 'Tom', age: 28 },
    birthday: new Date('1990-01-01'),
    sayHi: function() { console.log('Hi!'); },
    regexp: /test/,
    nullValue: null,
    undefinedValue: undefined,
    infinityValue: Infinity,
    nanValue: NaN
};

// 1. 使用 JSON.parse(JSON.stringify()) 进行深拷贝
console.log('=== JSON.parse(JSON.stringify()) 深拷贝 ===');
const jsonClone = JSON.parse(JSON.stringify(originalObj));

// 2. 自定义深拷贝函数
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    
    // 处理日期对象
    if (obj instanceof Date) return new Date(obj);
    
    // 处理正则对象
    if (obj instanceof RegExp) return new RegExp(obj);
    
    // 处理循环引用
    if (hash.has(obj)) return hash.get(obj);
    
    // 创建新的对象或数组
    let cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj);
    
    // 递归复制所有属性
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    
    return cloneObj;
}

// 使用自定义函数进行深拷贝
const customClone = deepClone(originalObj);

// 测试修改
console.log('修改前：');
console.log('原始对象:', JSON.stringify(originalObj, null, 2));
console.log('JSON克隆:', JSON.stringify(jsonClone, null, 2));
console.log('自定义克隆:', JSON.stringify(customClone, null, 2));

// 修改嵌套属性
jsonClone.address.city = 'Shanghai';
jsonClone.hobbies[1].name = 'running';
customClone.address.city = 'Guangzhou';
customClone.hobbies[1].name = 'cycling';

console.log('\n修改后：');
console.log('原始对象:', JSON.stringify(originalObj, null, 2));
console.log('JSON克隆:', JSON.stringify(jsonClone, null, 2));
console.log('自定义克隆:', JSON.stringify(customClone, null, 2));

// 测试特殊情况
console.log('\n=== 特殊情况测试 ===');
console.log('1. 函数拷贝:');
console.log('原始对象有函数:', typeof originalObj.sayHi === 'function');
console.log('JSON克隆后函数丢失:', jsonClone.sayHi === undefined);
console.log('自定义克隆保留函数:', typeof customClone.sayHi === 'function');

console.log('\n2. 日期对象:');
console.log('原始日期:', originalObj.birthday);
console.log('JSON克隆日期(转为字符串):', jsonClone.birthday);
console.log('自定义克隆日期(保持Date对象):', customClone.birthday);

console.log('\n3. 正则表达式:');
console.log('原始正则:', originalObj.regexp);
console.log('JSON克隆正则(转为空对象):', jsonClone.regexp);
console.log('自定义克隆正则(保持RegExp对象):', customClone.regexp);

// 测试循环引用
console.log('\n4. 循环引用测试:');
const circularObj = { name: 'circular' };
circularObj.self = circularObj;

try {
    const jsonCircularClone = JSON.parse(JSON.stringify(circularObj));
    console.log('JSON克隆循环引用对象:', jsonCircularClone);
} catch (e) {
    console.log('JSON克隆循环引用失败:', e.message);
}

const customCircularClone = deepClone(circularObj);
console.log('自定义克隆处理循环引用成功'); 