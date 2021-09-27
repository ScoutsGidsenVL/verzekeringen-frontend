<template>
  <div v-show="holderState === HolderStates.GENERAL">
    <request-insurance-general />
  </div>

  <div v-show="holderState === HolderStates.TYPE">
    <request-insurance-type />
  </div>

  <div v-if="holderState === HolderStates.DETAIL">
    <request-insurance-submit />
  </div>

  <div v-if="holderState === HolderStates.COMPLETED">
    <request-insurance-detail />
  </div>
</template>

<script lang="ts">
import RequestInsuranceGeneral from '@/components/requestInsurance/RequestInsuranceGeneral.vue'
import RequestInsuranceDetail from '@/components/requestInsurance/RequestInsuranceDetail.vue'
import RequestInsuranceType from '@/components/requestInsurance/RequestInsuranceType.vue'
import RequestInsuranceSubmit from '@/components/requestInsurance/RequestInsuranceSubmit.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HolderStateForm',
  components: {
    'request-insurance-general': RequestInsuranceGeneral,
    'request-insurance-detail': RequestInsuranceDetail,
    'request-insurance-submit': RequestInsuranceSubmit,
    'request-insurance-type': RequestInsuranceType,
  },
  setup() {
    const store = useStore()
    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })
    return {
      HolderStates,
      holderState,
    }
  },
})
</script>
