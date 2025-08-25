import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AIProgramming from '../views/AIProgramming.vue'
import AIEngineering from '../views/AIEngineering.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory('/ltc_ai/'),
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