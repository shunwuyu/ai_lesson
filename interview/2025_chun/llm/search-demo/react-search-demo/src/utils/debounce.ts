export function debounce(func:(...args: any[]) => void, wait:number) {
    let timeout: NodeJS.Timeout;
    return function (...args:any[]) {
        var context = this;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
