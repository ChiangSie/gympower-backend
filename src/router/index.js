import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/backstage',
          component: () => import('../views/HomeInnerPage/BackstageManager.vue')
        },
        {
          path: '/memberaccount',
          component: () => import('../views/HomeInnerPage/MemverAccount.vue')
        },
        {
          path: '/fitnessdiary',
          component: () => import('../views/HomeInnerPage/FitnessDiary.vue')
        },
        {
          path: '/discount',
          component: () => import('../views/HomeInnerPage/DiscountManager.vue')
        },
        {
          path: '/popcoures',
          component: () => import('../views/HomeInnerPage/PopCoures.vue')
        },
        {
          path: '/course',
          component: () => import('../views/HomeInnerPage/CourseView.vue')
        },
        {
          path: '/bento',
          component: () => import('../views/HomeInnerPage/BentoView.vue')
        },
        {
          path: '/bentocontent',
          component: () => import('../views/HomeInnerPage/BentoContent.vue')
        },
        {
          path: '/coach',
          component: () => import('../views/HomeInnerPage/CoachView.vue')
        },
        {
          path: '/customserv',
          component: () => import('../views/HomeInnerPage/CustomServ.vue')
        }
      ]
    }
  ]
})

export default router
