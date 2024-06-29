import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/backstage',
          component: () => import('../views/HomeInnerPage/BackstageManager.vue')
        },
        {
          path: '/memberaccount',
          component: () => import('../views/HomeInnerPage/MemberAccount.vue')
        },
        {
          path: '/fitnessdiary',
          component: () => import('../views/HomeInnerPage/FitnessDiary.vue')
        },
        {
          path: '/course',
          component: () => import('../views/HomeInnerPage/CourseView.vue'),
          children: [
            {
              path: '/course_content',
              component: () => import('../views/HomeInnerPage/CourseContent.vue')
            },
            {
              path: '/course_order',
              component: () => import('../views/HomeInnerPage/CourseOrder.vue')
            }
          ]
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
        }
      ]
    }
  ]
})

export default router
