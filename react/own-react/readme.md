[source](https://pomb.us/build-your-own-react/)

- react 源码构成
    1. The createElement Function
        JSX 
        createElement 函数用于创建描述 UI 的普通对象（React 元素），是 JSX 编译后的结果。
    2. The render Function
        render 函数是 React 的入口，负责将 React 元素渲染到 DOM 容器中。
    3. Concurrent Mode
        Concurrent Mode：让 React 能中断渲染，优先处理高优先级更新。
    4. Fibers
        Fiber 是 React 的调度单元，实现可中断的增量渲染。
    5. Render and Commit Phases  渲染和提交
        渲染阶段负责“算”（计算要改什么），提交阶段负责“改”（真正更新 DOM）。 
    6. Reconciliation 协调 
        指的是 React 更新 DOM 的过程。具体来说，当组件的状态（state）或属性（props）发生变化时，React 会创建一个新的虚拟 DOM（Virtual DOM）树，并将其与上一次渲染的虚拟 DOM 树进行比较（这个过程就是协调），找出需要更新的最小差异部分，然后只更新真实 DOM 中发生变化的部分，以提高性能。
    7. Function Components
    8. Hooks

## Step One

```js
//three lines of code.
const element = <h1 title="foo">Hello</h1> // defines a React element. 
const container = document.getElementById("root") //  gets a node from the DOM.
ReactDOM.render(element, container) // renders the React element into the container.
```
JSX It isn’t even valid JavaScript， we need to replace it with valid JS.

JSX is transformed to JS by build tools like Babel. The transformation is usually simple: replace the code inside the tags with a call to createElement, passing the tag name, the props and the children as parameters.

Babel  
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
babel-react-demo
npx babel src --out-dir dist
JSX 已被转换为 React.createElement 调用。


React.createElement creates an object from its arguments. 
the tag name, the props and the children as parameters.
Besides some validations, that’s all it does. So we can safely replace the function call with its output.

const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}

And this is what an element is, an object with two properties: type and props (well, it has more, but we only care about these two).

The type is a string that specifies the type of the DOM node we want to create
it’s the tagName you pass to document.createElement when you want to create an HTML element. 
It can also be a function, but we’ll leave that for Step VII.

props is another object, it has all the keys and values from the JSX attributes. It also has a special property: children.

children in this case is a string, but it’s usually an array with more elements. That’s why elements are also trees.

The other piece of React code we need to replace is the call to ReactDOM.rende

render is where React changes the DOM, so let’s do the updates ourselves.

demo1 And now we have the same app as before, but without using React.

## Step I: The createElement Function
writing our own createElement.
As we saw in the previous step, an element is an object with type and props. The only thing that our function needs to do is create that object.

We use the spread operator for the props and the rest parameter syntax for the children, this way the children prop will always be an array.

```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}
```
createElement("div") returns:

{
  "type": "div",
  "props": { "children": [] }
}

createElement("div", null, a) returns:

{
  "type": "div",
  "props": { "children": [a] }
}

createElement("div", null, a, b) returns:

{
  "type": "div",
  "props": { "children": [a, b] }
}

The children array could also contain primitive values like strings or numbers. So we’ll wrap everything that isn’t an object inside its own element and create a special type for them: TEXT_ELEMENT.


```js
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children:children.map(child => 
        typeof child === 'object'?child:createTextElement(child)
      )
    },
  }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children:[]
        }
    }
}
```
```
const element = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
)
```

didactic

const Didact = {
  createElement,
}

const element = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
)


const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)

## render function 