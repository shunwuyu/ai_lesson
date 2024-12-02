Object.defineProperty({}, "num", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: true
});

var value = 1;
Object.defineProperty({}, "num", {
    get : function(){
      return value;
    },
    set : function(newValue){
      value = newValue;
    },
    enumerable : true,
    configurable : true
});


var obj = {}, value = null;
Object.defineProperty(obj, "num", {
    get: function(){
        console.log('执行了 get 操作')
        return value;
    },
    set: function(newValue) {
        console.log('执行了 set 操作')
        value = newValue;
    }
})

obj.num = 1 // 执行了 set 操作

console.log(obj.num); 
