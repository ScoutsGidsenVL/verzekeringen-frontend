<template>
  <div class="container">
    <request-bread-crumb />
    <div v-if="data.vvksComment && holderState !== HolderStates.COMPLETED && holderState !== HolderStates.DETAIL">
      <important-message :message="data.vvksComment" />
    </div>
  </div>

  <div class="container">
    <state-form-holder />
  </div>
</template>

<script lang="ts">
import RequestBreadCrumb from '@/components/requestInsurance/requestBreadCrumb/RequestBreadCrumb.vue'
import ImportantMessage from '@/components/semantic/ImportantMessage.vue'
import StateFormHolder from '@/components/semantic/HolderStateForm.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { HolderStates } from '@/enums/holderStates'

export default defineComponent({
  name: 'RequestInsurance',
  components: {
    'request-bread-crumb': RequestBreadCrumb,
    'important-message': ImportantMessage,
    'state-form-holder': StateFormHolder,
  },
  setup() {
    const store = useStore()
    let data: any = store.getters.getCurrentInsuranceState
    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })
    return {
      data,
      holderState,
      HolderStates,
    }
  },
})
</script>
