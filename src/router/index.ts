import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RequestInsurance from '../views/RequestInsurance.vue'
import oneTimeActivityDetail from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivityDetail.vue'
import nonMemberDetail from '@/components/insurances/nonMembersInsurance/nonMemberDetail.vue'

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
  {
    path: '/eenmalige-activiteit-detail/:id?',
    name: 'ActivityDetail',
    component: oneTimeActivityDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
    },
  },
  {
    path: '/tijdelijke-verzekering-niet-leden-detail/:id?',
    name: 'NonMemberDetail',
    component: nonMemberDetail,
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
