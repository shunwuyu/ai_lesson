// 我们需要写一个函数，输入 'kevin'，返回 'HELLO, KEVIN'。
var toUpperCase = function(x) { return x.toUpperCase(); };
var hello = function(x) { return 'HELLO, ' + x; };
var addComa = function(x) { return x + '!!!'}
// var greet = function(x){
//     return hello(toUpperCase(x));
// };

// greet('kevin');

// var compose = function(f,g) {
//     return function(x) {
//         return f(g(x));
//     };
// };

function compose() {
    var args = arguments;
    var start = args.length - 1;
    // console.log(start)
    return function() {
        var i = start;
        console.log(args[start])
        var result = args[start].apply(this, arguments);
        // console.log(result)
        while (i--) result = args[i].call(this, result);
        return result;
    };
};


var greet = compose(addComa, toUpperCase, hello);
console.log(greet('kevin'));

