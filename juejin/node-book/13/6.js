import fs from 'fs'

// fs.renameSync('test.txt', 'test2.txt')

// fs.renameSync('test2.txt', 'test-dir/test2.txt')
// fs.unlinkSync('test-dir/test2.txt')
fs.rmSync('test-dir/test2.txt')
