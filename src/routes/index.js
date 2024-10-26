import { createRouter, createWebHistory } from 'vue-router'
import RegisterUser from '../views/RegisterUsers.vue'
import ProfileUser from '@/views/ProfileUser.vue'

const routes = [
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser
  },
  {
    path: '/profile',
    name: 'ProfileUser',
    component: ProfileUser
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
