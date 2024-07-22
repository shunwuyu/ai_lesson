import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const rootRoutes: RouteRecordRaw[] = [
    {
      path: "home",
      name: "Home",
      component: () => import("@/views/HomePage/HomePage.vue"),
    },
    {
      path: "account",
      name: "Account",
      component: () => import("@/views/account/TheAccount.vue"),
    },
    {
      path: "discount",
      name: "discount",
      component: () => import("@/views/DiscountSection/DiscountSection.vue"),
    },
    {
      path: "collection",
      name: "Collection",
      component: () => import("@/views/TheCollection.vue"),
    },
    {
      path: "trip",
      name: "Trip",
      component: () => import("@/views/TravelPlan/TravelPlan.vue"),
      children: [
        //我的订单
        {
          path: "my-order",
          name: "MyOrder",
          component: () => import("@/views/TravelPlan/MyOrder.vue"),
        },
        {
          path: "fail-payorder",
          name: "FailPayOrder",
          component: () => import("@/views/TravelPlan/FailPayOrder.vue"),
        },
        {
          path: "seale-order",
          name: "SealeOrder",
          component: () => import("@/views/TravelPlan/SealedOrders.vue"),
        },
      ],
    },
  ]

  const routes: RouteRecordRaw[] = [
    {
      path: "/",
      name: "App",
      component: () => import("@/views/TheRoot.vue"),
      redirect: "/home",
      children: rootRoutes,
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/TheLogin.vue"),
    },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router