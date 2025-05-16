const a = 1;
// Assignment to constant variable.
a = 2;

const data = {
    value: 1
}

// 没有问题
data.value = 2;
data.num = 3;

// 报错
data = {};