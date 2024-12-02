import AppHeader from "./components/app-header";
import PostIndex from "../post/index/post-index";
import AppForm from "./form/app-form"

const App = () => {
  return (
    <div className="container">
        <AppHeader name="旅梦开发团" theme="system"/>
        <AppForm />
        <PostIndex/>
    </div>
  )
}

export default App
