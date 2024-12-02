import Home from '@/pages/Home'
import Data from '@/pages/Data'
import User from '@/pages/User'

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
]
export default routes