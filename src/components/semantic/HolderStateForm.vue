<template>
  <div v-show="holderState === HolderStates.GENERAL">
    <request-inusrance-general />
  </div>

  <div v-show="holderState === HolderStates.TYPE">
    <request-inusrance-type />
  </div>

  <div v-show="holderState === HolderStates.DETAIL">
    <request-inusrance-detail />
  </div>
</template>

<script lang="ts">
import RequestInusranceGeneral from '@/components/requestInsurance/RequestInusranceGeneral.vue'
import RequestInusranceDetail from '@/components/requestInsurance/RequestInsuranceDetail.vue'
import RequestInusranceType from '@/components/requestInsurance/RequestInsuranceType.vue'
import { HolderStates } from '@/enums/holderStates'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'HolderStateForm',
  components: {
    'request-inusrance-general': RequestInusranceGeneral,
    'request-inusrance-detail': RequestInusranceDetail,
    'request-inusrance-type': RequestInusranceType,
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
