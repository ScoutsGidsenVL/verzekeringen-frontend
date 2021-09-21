<template>
  <call-to-action link="/aanvraag/schadeaangifte" text="Start een nieuwe aangifte" />
  <div class="container">
    <claim-list v-if="data && data.results" title="Aangiftes" :items="data.results" />
    <div class="flex gap-5 pt-1 pb-5 float-right">
      <a v-if="data.previous && !isLoading" class="link-inline cursor-pointer" @click="getPreviousClaims(data.previous)">Vorige pagina</a>
      <a v-if="data.next && !isLoading" class="link-inline cursor-pointer" @click="getNextClaims(data.next)">Volgende pagina</a>
      <loader :isLoading="isLoading" color="black" />
    </div>
  </div>
</template>

<script lang="ts">
import CallToAction from '../components/customHeadlines/CallToAction.vue'
import { ClaimRepository } from '@/repositories/claims/claimRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import ClaimList from '@/components/semantic/ClaimList.vue'
import { ArrayResult } from '@/serializer/ArrayResult'
import { Loader } from 'vue-3-component-library'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ClaimsHome',
  components: {
    'call-to-action': CallToAction,
    'claim-list': ClaimList,
    loader: Loader,
  },
  setup() {
    const isLoading = ref<boolean>(false)
    const store = useStore()
    store.dispatch('resetStates')
    const data = ref<ArrayResult>()
    const getClaims = () => {
      RepositoryFactory.get(ClaimRepository)
        .getArray('/insurances_claims/?page=1&page_size=10')
        .then((res: ArrayResult) => {
          data.value = res
        })
    }

    const getPreviousClaims = (previous: string) => {
      isLoading.value = true
      RepositoryFactory.get(ClaimRepository)
        .getArray(previous)
        .then((res: ArrayResult) => {
          data.value = res
          isLoading.value = false
        })
    }

    const getNextClaims = (next: string) => {
      isLoading.value = true
      RepositoryFactory.get(ClaimRepository)
        .getArray(next)
        .then((res: ArrayResult) => {
          data.value = res
          isLoading.value = false
        })
    }
    getClaims()

    return {
      data,
      getPreviousClaims,
      getNextClaims,
      isLoading,
    }
  },
})
</script>
