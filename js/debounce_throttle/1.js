function debounce(fun, delay) {
    return function (args) {
        // let that = this
        // let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun(args)
        }, delay)
    }
}

function debounce(fun, delay) {
    return function (args) {
        let that = this
        let _args = args
        clearTimeout(fun.id)
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}


let obj = {
    count: 0,
    inc: debounce(function (val) {
        console.log(this.count, val)
    }, 500)
}
obj.inc(42)


