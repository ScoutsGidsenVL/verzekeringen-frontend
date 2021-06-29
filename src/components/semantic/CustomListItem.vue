<template>
  <div v-if="item" class="md:grid-cols-list grid py-2 border-t-2 border-black">
    <div>
      <p>{{ item.startDate && item.endDate ? formatDate(item.startDate, item.endDate) : '' }}</p>
    </div>
    <div>
      <p>{{ item.group && item.group.name ? item.group.name : '' }} {{ item.group && item.group.id ? item.group.id : '' }}</p>
    </div>
    <div>
      <p>{{ item.type && item.type.description ? item.type.description : '' }}</p>
    </div>
    <div>
      <p>{{ item.status && item.status.label ? item.status.label : '' }}</p>
    </div>
    <div>
      <div v-if="item.type && item.type.name" class="float-right flex gap-5">
        <div v-if="isDraft" @click="goToDraft(item.id, item.type.name)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>

        <div v-if="isDraft" @click="deleteDraft(item.id)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-red cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <div v-if="!isDraft" @click="fetchInsuranceById(item.id, item.type.name)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hover:text-lightGreen cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>

        <div v-if="!isDraft">
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
import { InsuranceTypeRepos, InsuranceTypes, InsuranceTypeStoreSetters } from '@/enums/insuranceTypes'
import { routeDetailLinkBasedOnType } from '@/helpers/routerHelper'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { DraftRepository } from '@/repositories/insurances/draftRepository'
import { formatDate } from '@/helpers/formatHelper'
import { Insurance } from '@/serializer/Insurance'
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default defineComponent({
  name: 'CustomListItem',
  props: {
    item: {
      type: Object as PropType<Insurance>,
      required: true,
    },
    isDraft: Boolean,
  },
  setup(props, context) {
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

    const goToDraft = (id: string, type: string) => {
      setInsuranceType(type)

      //@ts-ignore
      RepositoryFactory.get(InsuranceTypeRepos[store.getters.insuranceTypeState])
        //@ts-ignore
        .getDraftById(id)
        .then((result: any) => {
          //@ts-ignore
          store.dispatch(InsuranceTypeStoreSetters[store.getters.insuranceTypeState], result).then(() => {
            router.push('/draft-bewerken/' + id)
          })
        })
    }

    const deleteDraft = (id: string) => {
      RepositoryFactory.get(DraftRepository)
        .removeById(id)
        .then(() => {
          context.emit('removeDraft', id)
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

        case 'TypeTijdelijkeAutoverzekering':
          setInsuranceTypeState(InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING)
          break

        case 'TypeEvenementenVerzekering':
          setInsuranceTypeState(InsuranceTypes.EVENEMENTEN_VERZEKERING)
          break

        case 'TypeGroepsmateriaalVerzekering':
          setInsuranceTypeState(InsuranceTypes.MATERIAAL_VERZEKERING)
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
      deleteDraft,
      formatDate,
      goToDraft,
    }
  },
})
</script>
