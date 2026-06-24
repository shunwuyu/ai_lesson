import path from 'path'

console.log('=== path.basename ===')
console.log(path.basename('a/b/c.js'))
console.log(path.basename('a/b/c.js', '.js'))
console.log(path.basename('a/b/c.js', 'js'))
console.log(path.basename('a/b/c.js', 's'))
