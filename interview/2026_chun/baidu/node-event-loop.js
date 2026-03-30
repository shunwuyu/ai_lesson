const fs = require('fs')

console.log('start')

setTimeout(() => {
  console.log('timeout')
}, 0)

setImmediate(() => {
  console.log('immediate')
})

fs.readFile(__filename, () => {
  console.log('readFile')

  setTimeout(() => {
    console.log('timeout in I/O')
  }, 0)

  setImmediate(() => {
    console.log('immediate in I/O')
  })
})

Promise.resolve().then(() => {
  console.log('promise')
})

process.nextTick(() => {
  console.log('nextTick')
})

console.log('end')