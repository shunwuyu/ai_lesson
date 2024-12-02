import AppHeader from "./components/app-header";
import PostIndex from "../post/index/post-index";
const App = () => {
  return (
    <div className="container">
        <AppHeader name="旅梦开发团" theme="system"/>
        <PostIndex/>
    </div>
  )
}

export default App
