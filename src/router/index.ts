import { createRouter, createWebHistory } from 'vue-router'
import UserLayout from '../layouts/UserLayout.vue' // Ýoly dogrylaň
import HomeView from '../views/HomeView.vue' // Ýoly dogrylaň

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout, // Layout-y ulanýarys
      children: [
        {
          path: '', // Boş ýol '/' diýmekdir
          name: 'home',
          component: HomeView, // Layout-yň içindäki <router-view>-da açylar
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('../views/DetailView.vue'),
        },
      ],
    },
  ],
})

export default router
