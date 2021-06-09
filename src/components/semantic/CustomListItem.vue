<template>
  <div class="custom-grid py-2 border-t-2 border-black">
    <div>
      <p>{{ formatDate(item.startDate, item.endDate) }}</p>
    </div>
    <div>
      <p>{{ item.group.name }}</p>
    </div>
    <div>
      <p>{{ item.type.description }}</p>
    </div>
    <div>
      <p>{{ item.status.label }}</p>
    </div>
    <div>
      <div class="float-right flex gap-5">
        <div @click="fetchInsuranceById(item.id, item.type.name)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
        <div>
          <router-link :to="routeDetailLinkBasedOnType(item.type.name) + '/' + item.id">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-lightGreen cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { routeDetailLinkBasedOnType } from '@/helpers/routerHelper'
import { formatDate } from '@/helpers/formatHelper'
import { Insurance } from '@/serializer/Insurance'
import { defineComponent, PropType } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import { InsuranceTypeRepos, InsuranceTypes, InsuranceTypeStoreSetters } from '@/enums/insuranceTypes'
import RepositoryFactory from '@/repositories/repositoryFactory'

export default defineComponent({
  name: 'CustomListItem',
  props: {
    item: {
      type: Object as PropType<Insurance>,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const fetchInsuranceById = (id: string, type: string) => {
      setInsuranceType(type)
      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getById(id)
        .then((result: any) => {
          //@ts-ignore
          store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], result).then(() => {
            router.push('/verzekering-bewerken/' + id)
          })
        })
    }

    const setInsuranceType = (type: string) => {
      switch (type) {
        case 'TypeEenmaligeActiviteit':
          setInsuranceTypeState(InsuranceTypes.EENMALIGE_ACTIVITEIT)
          break

        case 'TypeTijdelijkeVerzekering':
          setInsuranceTypeState(InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN)
          break

        case 'TypeEthiasAssistanceMetAuto':
          setInsuranceTypeState(InsuranceTypes.REIS_BIJSTAND)
          break

        case 'TypeEthiasAssistanceZonderAuto':
          setInsuranceTypeState(InsuranceTypes.REIS_BIJSTAND)
          break

        default:
          break
      }
    }
    const setInsuranceTypeState = (value: string) => {
      store.dispatch('setInsuranceTypeState', value)
    }
    return {
      routeDetailLinkBasedOnType,
      fetchInsuranceById,
      formatDate,
    }
  },
})
</script>

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 25% 20% 35% 15% 5%;
}
</style>
