<template>
  <div class="w-auto pl-5 bg-lightGray pt-5 pb-5">
    <router-link to="/aanvraag">
      <custom-button text="Vraag nieuwe verzekering aan" />
    </router-link>
  </div>
  <div class="mt-5">
    <custom-list :items="results" title="Recent aangevraagd" />
  </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insurances/insuranceRepository'
import RepositoryFactory from '@/repositories/repositoryFactory'
import customList from '../components/semantic/CustomList.vue'
import customButton from '../components/CustomButton.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {
    'custom-button': customButton,
    'custom-list': customList,
  },
  setup: () => {
    const results = ref<any>([])
    RepositoryFactory.get(InsuranceRepository)
      .getArray()
      .then((res: any) => {
        results.value = res
      })
    return { results }
  },
})
</script>
