Function.prototype.mybind = function(context, ...args){
    return (...newArgs) => {
        return this.call(context,...args, ...newArgs)
    }
}
