var value = "global";

(function() {
    console.log(value); // ReferenceError: Cannot access 'value' before initialization
    let value = 'local'; // 局部变量覆盖了外层的全局变量
}());