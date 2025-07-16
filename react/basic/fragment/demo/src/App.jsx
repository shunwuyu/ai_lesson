import { 
  Fragment
} from 'react'
import './App.css'

// function Demo() {
//   return (
//     <div>
//       <h1>Hello</h1>
//       <p>World</p>
//     </div>
//   );
// }
// Fragment 组件
// function Demo() {
//   return (
//     <Fragment>
//       <h1>Hello</h1>
//       <p>World</p>
//     </Fragment>
//   );
// }

// 它就是 React.Fragment 的缩写，不添加额外 DOM 元素，只用于包裹多个元素。
// function Demo() {
//   return (
//     <>
//       <h1>Hello</h1>
//       <p>World</p>
//     </>
//   );
// }


function Demo({ items }) {
  return items.map(item => (
    <Fragment key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </Fragment>
  ));
}

function App() {
  const items = [
    {
      id: 1,
      title: '标题1',
      content: '内容'
    }
  ]
  return (
    <>
      <Demo items={items}/>
    </>
  )
}

export default App
