import { createElement } from 'react';
function App() {
  // JSX 语法，JavaScript 代码中可以写 HTML 代码
  // let myTitle = <h1>Hello, world!</h1>;
  // JSX 语法的最外层，只能有一个节点。
  // let myTitle = <p>Hello</p><p>World</p>;
  // let myTitle = <div><p>Hello</p><p>World</p></div>;
  // fragment frament.html 性能好
  // let myTitle = <><p>Hello</p><p>World</p></>;
  // console.log(myTitle) // react component
  // JavaScript 引擎（包括浏览器和 Node）都不认识 JSX，需要首先使用 Babel 转码，然后才能运行
  let myTitle = <p>{'Hello ' + 'World'}</p>
  return (
    <>
      {myTitle}
      {createElement('p', {className: 'title'}, 'Hello World!!!')}
    </>
  )
}

export default App
