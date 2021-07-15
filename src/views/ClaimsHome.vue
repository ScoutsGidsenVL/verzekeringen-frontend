<template>
  <call-to-action link="/aanvraag/schade-aangifte" text="Vraag nieuwe schade aangifte aan" />
  <div class="container">
    <claim-list title="Claims" :items="data.results" />
  </div>
</template>

<script lang="ts">
import CallToAction from '../components/customHeadlines/CallToAction.vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import RepositoryFactory from '@/repositories/repositoryFactory'
import { ClaimRepository } from '@/repositories/claims/claimRepository'
import { ArrayResult } from '@/serializer/ArrayResult'
import ClaimList from '@/components/semantic/ClaimList.vue'

export default defineComponent({
  name: 'ClaimsHome',
  components: {
    'call-to-action': CallToAction,
    'claim-list': ClaimList,
  },
  setup() {
    const store = useStore()
    store.dispatch('resetStates')
    const data = ref<ArrayResult>({ results: [], next: '', previous: '', count: '0' })
    const getClaims = () => {
      RepositoryFactory.get(ClaimRepository)
        .getArray('/insurances_claims/?page=1&page_size=10')
        .then((res: ArrayResult) => {
          data.value = res
        })
    }
    getClaims()

    return {
      data,
    }
  },
})
</script>
