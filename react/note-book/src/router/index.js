// router/index.js
import Home from '@/views/Home'
import Data from '@/views/Data'
import User from '@/views/User'
import Login from '@/views/Login'
import UserInfo from '@/views/UserInfo'

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/userinfo",
    component: UserInfo
  }
];

export default routes
