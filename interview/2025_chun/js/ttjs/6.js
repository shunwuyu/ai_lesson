let res = new Array()
for(var i = 0; i < 10; i++){
    res.push(function(){
        return console.log(i)
    })
}
res[0]()  // 10
res[1]()  // 10
res[2]()  // 10

// 期望输出的是0,1,2,实际上却不会。原因就是涉及「作用域」，怎么解决呢？
// 使用let代替var，形成块级作用域
// 使用bind函数。
// res.push(console.log.bind(null, i))