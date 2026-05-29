import { createRouter, createWebHistory } from 'vue-router';

import Index from '../components/Index.vue';
import About from '../components/About.vue';
import PostIndex from '../components/post/index/post-index.vue';
import PostShow from '../components/post/show/post-show.vue';
import PostMeta from '../components/post/show/components/post-meta.vue';

const postRoutes = [
  {
    path: '/posts',
    name: 'postIndex',
    component: PostIndex,
    props: {
      sort: 'popular',
    },
  },
  {
    path: '/posts/:postId',
    name: 'postShow',
    component: PostShow,
    props: true,
    children: [
      {
        path: 'meta',
        component: PostMeta,
      },
    ],
  },
];


const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/about',
    component: About,
    name: 'about',
    meta: {
      requiresAuth: true,
    }
  },
  ...postRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * 导航守卫
 */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    console.log('👮');
    next('/login')
  }

  next();

  // console.log('to: ', to);
  // console.log('from:', from);

  // if (to.name === 'postIndex') {
  //   next('/');
  // } else {
  //   next();
  // }
});

export default router;