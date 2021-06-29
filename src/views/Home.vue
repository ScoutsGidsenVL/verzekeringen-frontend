<template>
  <call-to-action link="/aanvraag" text="Vraag nieuwe verzekering aan" />
  <div class="container">
    <div v-if="drafts">
      <custom-list :is-draft="true" :items="drafts.results" title="Nog te voltooien" @removeDraft="removeDraft($event)" />
      <div class="flex gap-5 pt-1 pb-5 float-right">
        <a v-if="drafts.previous" class="link-inline cursor-pointer" @click="getPreviousDrafts(drafts.previous)">Vorige pagina</a>
        <a v-if="drafts.next" class="link-inline cursor-pointer" @click="getNextDrafts(drafts.next)">Volgende pagina</a>
      </div>
    </div>
    <div v-if="data">
      <custom-list :items="data.results" title="Recent aangevraagd" />
      <div class="flex gap-5 pt-1 pb-5 float-right">
        <a v-if="data.previous" class="link-inline cursor-pointer" @click="getPreviousInsurances(data.previous)">Vorige pagina</a>
        <a v-if="data.next" class="link-inline cursor-pointer" @click="getNextInsurances(data.next)">Volgende pagina</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insurances/insuranceRepository'
import { DraftRepository } from '@/repositories/insurances/draftRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import customList from '../components/semantic/CustomList.vue'
import CallToAction from '../components/customHeadlines/CallToAction.vue'
import { ArrayResult } from '@/serializer/ArrayResult'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-list': customList,
    'call-to-action': CallToAction,
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
      RepositoryFactory.get(DraftRepository)
        .getArray(previous)
        .then((res: ArrayResult) => {
          drafts.value = res
        })
    }

    const getNextDrafts = (next: string) => {
      RepositoryFactory.get(DraftRepository)
        .getArray(next)
        .then((res: ArrayResult) => {
          drafts.value = res
        })
    }

    const removeDraft = () => {
      getDrafts()
    }

    getInsurances()
    getDrafts()

    return {
      getPreviousInsurances,
      getNextInsurances,
      getPreviousDrafts,
      getNextDrafts,
      removeDraft,
      drafts,
      data,
    }
  },
})
</script>
