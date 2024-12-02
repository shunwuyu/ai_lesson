import { NavLink, Outlet } from "react-router-dom"
import './App.css'

function App() {
    return (
        <>
            <header>
                <NavLink to="/">{process.env.REACT_APP_NAME}</NavLink>
                <br />
                <nav>
                    <NavLink to="/about">关于</NavLink>
                    <NavLink to="/posts">内容</NavLink>
                </nav>
            </header>
            
            <Outlet />
        </>
    )
}
  
export default App
