import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RequestInsurance from '../views/RequestInsurance.vue'

const routes: any[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
    },
  },
  {
    path: '/aanvraag',
    name: 'Aanvraag',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering aanvragen',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
