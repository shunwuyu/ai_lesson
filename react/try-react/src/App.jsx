// 根组件 返回JSX的函数就是组件
import AppHeader from './components/app-header';

const App = () => {
  // App 的数据
  const name = "旅梦开发团"

  return (
    <div className="container">
      {/* 参数传递给子组件  */}
      <AppHeader name={name} theme="day"/>
    </div>
  )
}

export default App