import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes: any[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
