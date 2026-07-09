import fs from 'fs'

// const files = fs.readdirSync('test-dir', { withFileTypes: true })

// console.log(files.map((f) => ({ name: f.name, isDirectory: f.isDirectory() })))

// fs.mkdirSync('test-dir/a/b/c/d', { recursive: true })
fs.rmdirSync('test-dir/a', { recursive: true })