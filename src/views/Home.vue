<template>
  <div class="w-auto h-32 pl-5 pb-48 bg-lightGray">
    <router-link to="/aanvraag">
      <custom-button text="Vraag nieuwe verzekering aan" />
    </router-link>
  </div>
  <div class="mt-5">
    <custom-list :items="results" title="Recent aangevraagd" />
  </div>
</template>

<script lang="ts">
import { InsuranceRepository } from '@/repositories/insuranceRepository'
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
      .then((res) => {
        results.value = res
      })
    return { results }
  },
})
</script>
