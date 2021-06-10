import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RequestInsurance from '../views/RequestInsurance.vue'
import oneTimeActivityDetail from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivityDetail.vue'
import nonMemberDetail from '@/components/insurances/nonMembersInsurance/nonMemberDetail.vue'
import travelAssistanceDetail from '@/components/insurances/travelAssistance/travelAssistanceDetail.vue'
import eventInsuranceDetail from '@/components/insurances/eventInsurance/eventInsuranceDetail.vue'

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
    path: '/verzekering-bewerken/:id',
    name: 'Bewerken',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering Bewerken',
    },
  },
  {
    path: '/eenmalige-activiteit-detail/:id?',
    name: 'ActivityDetail',
    component: oneTimeActivityDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/tijdelijke-verzekering-niet-leden-detail/:id?',
    name: 'NonMemberDetail',
    component: nonMemberDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/reisbijstand-met-auto-detail/:id?',
    name: 'TravelAssistanceWithCar',
    component: travelAssistanceDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/reisbijstand-zonder-auto-detail/:id?',
    name: 'TravelAssistanceWithoutCar',
    component: travelAssistanceDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/evenementen-verzekering-detail/:id?',
    name: 'EventInsuranceDetail',
    component: eventInsuranceDetail,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
