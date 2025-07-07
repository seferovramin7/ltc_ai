import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AIProgramming from '../views/AIProgramming.vue'
import AIEngineering from '../views/AIEngineering.vue'
import Portfolio from '../views/Portfolio.vue'
import StudentProfile from '../views/StudentProfile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ai-programming',
    name: 'AIProgramming',
    component: AIProgramming
  },
  {
    path: '/ai-engineering',
    name: 'AIEngineering',
    component: AIEngineering
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/portfolio/:id',
    name: 'StudentProfile',
    component: StudentProfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router 