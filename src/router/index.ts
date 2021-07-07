import oneTimeActivityDetail from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivityDetail.vue'
import materialInsuranceDetail from '@/components/insurances/materialInsurance/materialInsuranceDetail.vue'
import travelAssistanceDetail from '@/components/insurances/travelAssistance/travelAssistanceDetail.vue'
import temporaryVehicleDetail from '@/components/insurances/tempCarInsurance/temporaryVehicleDetail.vue'
import eventInsuranceDetail from '@/components/insurances/eventInsurance/eventInsuranceDetail.vue'
import nonMemberDetail from '@/components/insurances/nonMembersInsurance/nonMemberDetail.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import RequestInsurance from '../views/RequestInsurance.vue'
import InsurancesHome from '../views/InsurancesHome.vue'
import ClaimsHome from '../views/ClaimsHome.vue'
import StartView from '@/components/start.vue'

const routes: any[] = [
  {
    path: '',
    name: 'Start',
    component: StartView,
    meta: {
      title: 'Verzekering',
    },
  },
  {
    path: '/home/schade-aangiftes',
    name: 'ClaimsHome',
    component: ClaimsHome,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Schade aangiftes',
    },
  },
  {
    path: '/aanvraag/schade-aangifte',
    name: 'AanvraagSchadeAangifte',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering aanvragen',
    },
  },
  {
    path: '/home/verzekeringen',
    name: 'InsurancesHome',
    component: InsurancesHome,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
    },
  },
  {
    path: '/aanvraag/verzekering',
    name: 'AanvraagVerzekering',
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
    props: { singlePage: true },
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
    props: { singlePage: true },
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
    props: { singlePage: true },
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
    props: { singlePage: true },
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
    props: { singlePage: true },
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/tijdelijke-autoverzekering-detail/:id?',
    name: 'TemporaryVehicleDetail',
    component: temporaryVehicleDetail,
    props: { singlePage: true },
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/materiaal-verzekering-detail/:id?',
    name: 'MaterialInsuranceDetail',
    component: materialInsuranceDetail,
    props: { singlePage: true },
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      detail: true,
    },
  },
  {
    path: '/draft-bewerken/:id',
    name: 'DraftBewerken',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering Bewerken',
      isDraft: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
