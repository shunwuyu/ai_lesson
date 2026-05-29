const obj = {
    name: '张三',
    getName: function() {
        return function() {
            return this.name;
        };
    }
};

console.log(obj.getName()()); // undefined


// 方案1：箭头函数
const obj = {
    name: '张三',
    getName: function() {
        return () => {
            return this.name;
        };
    }
};

// 方案2：保存 this
const obj = {
    name: '张三',
    getName: function() {
        const self = this;
        return function() {
            return self.name;
        };
    }
};