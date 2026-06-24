import path from 'path'

console.log('=== path.extname ===')
console.log(path.extname('a/b/c.js'))
console.log(path.extname('a/b/c'))
console.log(path.extname('a/b/c.d.ts'))
console.log(path.extname('a/b/.npmrc'))
