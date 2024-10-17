import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/login",
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      name: "menu",
      path: "/menu",  // 所有页面都在menu组件中由<router-view></router-view>渲染
      component: () => import("@/views/menu/index.vue"),
      children: [
        {
          name: "home",
          path: "/home",  // 由menu的<router-view></router-view>渲染
          component: () => import("@/views/home/index.vue"),
        },
      ]
    },
  ]
})

export default router;
