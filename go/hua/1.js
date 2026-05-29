function add(a, b) {
    console.log('重新计算')
    return a + b
}
  
const cache = {}
  
function proxyAdd(a, b) {
const key = `${a}-${b}`

if (cache[key]) {
    return cache[key]
}

const result = add(a, b)

cache[key] = result

return result
}
  
console.log(proxyAdd(1, 2))
console.log(proxyAdd(1, 2))