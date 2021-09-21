import oneTimeActivityDetail from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivityDetail.vue'
import materialInsuranceDetail from '@/components/insurances/materialInsurance/materialInsuranceDetail.vue'
import travelAssistanceDetail from '@/components/insurances/travelAssistance/travelAssistanceDetail.vue'
import temporaryVehicleDetail from '@/components/insurances/tempCarInsurance/temporaryVehicleDetail.vue'
import eventInsuranceDetail from '@/components/insurances/eventInsurance/eventInsuranceDetail.vue'
import nonMemberDetail from '@/components/insurances/nonMembersInsurance/nonMemberDetail.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import RequestInsurance from '../views/RequestInsurance.vue'
import InsurancesHome from '../views/InsurancesHome.vue'
import RequestClaim from '../views/RequestClaim.vue'
import ClaimsHome from '../views/ClaimsHome.vue'
import StartView from '@/components/start.vue'
import ClaimDetailPage from '@/components/requestClaim/detail/claimDetailPage.vue'
import Home from '@/views/Home.vue'

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
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresOpenIdAuth: true,
      homescreen: '/home',
    },
  },
  {
    path: '/home/schadeaangiftes',
    name: 'ClaimsHome',
    component: ClaimsHome,
    meta: {
      requiresOpenIdAuth: true,
      title: 'schadeaangiftes',
      homescreen: '/home',
    },
  },
  {
    path: '/aanvraag/schadeaangifte',
    name: 'AanvraagSchadeAangifte',
    component: RequestClaim,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Aangifte lichamelijke schade',
      homescreen: '/home/schadeaangiftes',
    },
  },
  {
    path: '/schadeaangifte-detail/:id?',
    name: 'ClaimDetail',
    component: ClaimDetailPage,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Overzicht schadeaangifte',
      detail: true,
      homescreen: '/home/schadeaangiftes',
    },
  },
  {
    path: '/home/verzekeringen',
    name: 'InsurancesHome',
    component: InsurancesHome,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering',
      homescreen: '/home',
    },
  },
  {
    path: '/aanvraag/verzekering',
    name: 'AanvraagVerzekering',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering aanvragen',
      homescreen: '/home/verzekeringen',
    },
  },
  {
    path: '/verzekering-bewerken/:id',
    name: 'Bewerken',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering Aanvragen',
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
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
      homescreen: '/home/verzekeringen',
    },
  },
  {
    path: '/draft-bewerken/:id',
    name: 'DraftBewerken',
    component: RequestInsurance,
    meta: {
      requiresOpenIdAuth: true,
      title: 'Verzekering Aanvragen',
      isDraft: true,
      homescreen: '/home/verzekeringen',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.homescreen) {
    localStorage.setItem('homescreen', String(to.meta.homescreen))
    next()
  } else {
    next()
  }
})

export default router
