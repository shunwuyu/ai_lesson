const arr = [1n, 2n, 3n];

arr.sort((a, b) => {
    return a - b;
});

console.log(arr);