<template>
 <div>
    <call-to-action link="/aanvraag/verzekering" text="Vraag nieuwe verzekering aan" />
  <div class="container">
    <div v-if="drafts">
      <custom-list :is-draft="true" :items="drafts.results" title="Nog te voltooien" @removeDraft="removeDraft($event)"> </custom-list>

      <div class="flex gap-5 pt-1 pb-5 float-right">
        <a v-if="drafts.previous" class="link-inline cursor-pointer" @click="getPreviousDrafts(drafts.previous)">Vorige pagina</a>
        <a v-if="drafts.next" class="link-inline cursor-pointer" @click="getNextDrafts(drafts.next)">Volgende pagina</a>
      </div>
    </div>

    <div v-if="data">
      <custom-list :items="data.results" title="Recent aangevraagd">
        <div class="pb-3" style="margin-top: -2em">
          <multi-select
            id="group"
            :object="true"
            placeholder="Filter op groep"
            track-by="fullInfo"
            value-prop="id"
            :options="userData.scoutsGroups"
            :loading-submit="isSubmitting"
            @addSelection="addSelectionInsurances($event)"
          />
        </div>
      </custom-list>

      <div class="flex gap-5 pt-1 pb-5 float-right">
        <a v-if="data.previous" class="link-inline cursor-pointer" @click="getPreviousInsurances(data.previous)">Vorige pagina</a>
        <a v-if="data.next" class="link-inline cursor-pointer" @click="getNextInsurances(data.next)">Volgende pagina</a>
      </div>
    </div>
  </div>
 </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insurances/insuranceRepository'
import { DraftRepository } from '@/repositories/insurances/draftRepository'
import CallToAction from '../components/customHeadlines/CallToAction.vue'
import { ResponsibleMember } from '@/serializer/ResponsibleMember'
import RepositoryFactory from '@/repositories/repositoryFactory'
import customList from '../components/semantic/CustomList.vue'
import MultiSelect from '@/components/inputs/MultiSelect.vue'
import { ArrayResult } from '@/serializer/ArrayResult'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { Group } from '@/serializer/Group'

export default defineComponent({
  name: 'InsurancesHome',
  components: {
    'call-to-action': CallToAction,
    'multi-select': MultiSelect,
    'custom-list': customList,
  },
  setup: () => {
    const store = useStore()
    store.dispatch('resetStates')
    const data = ref<ArrayResult>()
    const drafts = ref<ArrayResult>()
    const userData = ref<ResponsibleMember>(store.getters.user)

    const getInsurances = () => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray('/insurances/?page=1&page_size=10')
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
        .getArray('/insurance_drafts/?page=1&page_size=10')
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

    const addSelectionInsurances = (selection: Group) => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray('/insurances/?search=' + selection.id + '&page=1&page_size=10')
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    getInsurances()
    getDrafts()

    return {
      addSelectionInsurances,
      getPreviousInsurances,
      getNextInsurances,
      getPreviousDrafts,
      getNextDrafts,
      removeDraft,
      userData,
      drafts,
      data,
    }
  },
})
</script>
