// var isPowerOfTwo = function(n) {
//     if(n === 1) return true
//     while( n > 2 ){
//         n = n / 2
//         if(n % 2 !== 0) return false
//     }
//     return n===2

// };

var isPowerOfTwo = function(n) { return n>0 && (n & (n - 1)) === 0};