[source](https://juejin.cn/book/7304230207953567755/section/7304643411662635044)

- Node.js 内置了一个 path 模块，专门用于处理文件路径和目录路径。

```
import path from 'path'

console.log(path.join('a', 'b', 'c'))
console.log(path.join(process.cwd(), '/hello', 'world'))

```

- path.resolve
将多个路径拼接成一个绝对路径，返回一个解析后的绝对路径。

即如果传入相对路径，会以当前工作目录为基准，计算出绝对路径，如果传入了绝对路径，则以传入的绝对路径为基准。

```
import path from 'path'

console.log('=== path.resolve ===')
console.log(path.resolve('a', 'b', 'c'))
console.log(path.resolve('/hello', 'world', './a', 'b'))
```
- 1.3 path.dirname
```
console.log('=== path.dirname ===')
console.log(path.dirname(process.cwd()))
console.log(path.dirname('/a/b/c'))

```

1.4 path.basename
```
console.log('=== path.basename ===')
console.log(path.basename('a/b/c.js'))
console.log(path.basename('a/b/c.js', '.js'))
console.log(path.basename('a/b/c.js', 'js'))
console.log(path.basename('a/b/c.js', 's'))

```

1.5 path.extname
获取路径中的文件扩展名。

1.6 path.normalize
主要用于规范化路径，将路径中的不规范部分调整为标准格式，可以用于处理以下问题：

路径中的斜杠数量过多的情况。

路径中存在的 ./ 或 ../，即相对路径的情况。

1.7 path.parse
用于解析文件路径，将其拆分为一个对象。
```
console.log('=== path.parse ===')
console.log(path.parse('/home/user/dir/file.txt'))
```