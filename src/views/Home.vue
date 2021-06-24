<template>
  <div class="w-auto pl-5 bg-lightGray pt-5 pb-5 mt-4">
    <router-link to="/aanvraag">
      <custom-button text="Vraag nieuwe verzekering aan" />
    </router-link>
  </div>
  <div v-if="data" class="mt-5">
    <custom-list :items="data.results" title="Recent aangevraagd" />
    <div class="flex gap-5 pt-3 float-right">
      <custom-button v-if="data.previous" @click="getPreviousInsurances(data.previous)" text="Vorige" />
      <custom-button v-if="data.next" @click="getNextInsurances(data.next)" text="Volgende" />
    </div>
  </div>

  <div v-if="drafts && false" class="mt-5">
    <custom-list :items="drafts.results" title="Nog te voltooien" />
    <div class="flex gap-5 pt-3 float-right">
      <custom-button v-if="drafts.previous" @click="getPreviousDrafts(drafts.previous)" text="Vorige" />
      <custom-button v-if="drafts.next" @click="getNextDrafts(drafts.next)" text="Volgende" />
    </div>
  </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insurances/insuranceRepository'
import { DraftRepository } from '@/repositories/insurances/draftRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import customList from '../components/semantic/CustomList.vue'
import customButton from '../components/CustomButton.vue'
import { ArrayResult } from '@/serializer/ArrayResult'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-button': customButton,
    'custom-list': customList,
  },
  setup: () => {
    const store = useStore()
    store.dispatch('resetStates')

    const data = ref<ArrayResult>()
    const drafts = ref<ArrayResult>()

    const getInsurances = () => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray('/insurances/?page=1&page_size=5')
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    const getPreviousInsurances = (previous: string) => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray(previous)
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    const getNextInsurances = (next: string) => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray(next)
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    const getDrafts = () => {
      RepositoryFactory.get(DraftRepository)
        .getArray('/insurance_drafts/?page=1&page_size=5')
        .then((res: ArrayResult) => {
          drafts.value = res
        })
    }

    const getPreviousDrafts = (previous: string) => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray(previous)
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    const getNextDrafts = (next: string) => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray(next)
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    getInsurances()
    getDrafts()

    return {
      getPreviousInsurances,
      getNextInsurances,
      getPreviousDrafts,
      getNextDrafts,
      data,
      drafts,
    }
  },
})
</script>
