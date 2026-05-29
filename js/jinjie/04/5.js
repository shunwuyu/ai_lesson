console.log("我爱学习ABC。".length)
console.log("我是中国人".length)
// Emoji 的一个叫做“修饰序列（Modifier Sequence）”的功能造成的
// https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d9fedf43fe94fea87a44ec85ad9978c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp
console.log("🧑🏽‍🚒".length)
// Unicode 字符在 JavaScript 的 UTF-16 编码中，会占据 2byte 或者 4byte 空间，
// 也即 1 码元或者 2 码元。而 length 反映的是码元的数量，所以“𠯿”就是占据 4byte 
// 的那一种，在上一小节中我们已经看到了它经过 UTF-16 编码后是 0xD842DFFFF，
// 就是 2 个码元。
console.log("𠯿".length)