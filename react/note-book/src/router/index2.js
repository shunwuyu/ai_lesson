// router/index.js
// import Index from '../views/Index'
import Index from '@/views/Index'
// import About from '../views/About'
import About from '@/views/About'

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  }
];

export default routes
