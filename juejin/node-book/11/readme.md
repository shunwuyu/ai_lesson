# Global

JavaScript 中存在一个特殊的全局对象，可以在任意位置被访问,，通常用 globalThis 指代。 在浏览器中，指向 window 这个全局对象，而 Node.js 中指向 global, 当我们直接使用一些无需定义的方法时 (例如 console，setTimeout 等)，它们都是 global (Global objects) 上的属性。

```
globalThis == window
// node
globalThis == global
```

我们可以直接在上面挂载变量，这样在全局任意地方都可以访问。

```
global.userInfo = {
    name: 'xm',
    age: 18
}
```

global内置了许多的方法，我们可以通过 Object.getOwnPropertyNames(global) 简单获取, 非原型链上。可以看到很多熟悉的面孔都在上面挂载着。

# 常用 global 属性

<!-- 2.1 process -->
export DEEPSEEK_API_KEY=sk-2fe01
echo $DEEPSEEK_API_KEY
windows
set DEEPSEEK_API_KEY=sk-2fe01681f06

