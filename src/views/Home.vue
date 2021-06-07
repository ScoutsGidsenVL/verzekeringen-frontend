<template>
  <div class="w-auto pl-5 bg-lightGray pt-5 pb-5 mt-4">
    <router-link to="/aanvraag">
      <custom-button text="Vraag nieuwe verzekering aan" />
    </router-link>
  </div>
  <div class="mt-5">
    <custom-list :items="results" title="Recent aangevraagd" />
    <div v-if="false" class="mt-3">
      <pagination />
    </div>
  </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insurances/insuranceRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import customList from '../components/semantic/CustomList.vue'
import Pagination from '@/components/semantic/Pagination.vue'
import customButton from '../components/CustomButton.vue'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-button': customButton,
    'custom-list': customList,
    pagination: Pagination,
  },
  setup: () => {
    const store = useStore()
    store.dispatch('resetStates')

    const results = ref<any>([])

    const getInsurances = () => {
      RepositoryFactory.get(InsuranceRepository)
        .getArray()
        .then((res: any) => {
          results.value = res
        })
    }

    getInsurances()

    return {
      results,
    }
  },
})
</script>
