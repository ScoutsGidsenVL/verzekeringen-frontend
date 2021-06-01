<template>
  <div>
    <div v-if="isCurrentType(InsuranceTypes.EENMALIGE_ACTIVITEIT, insuranceTypeState)">
      <one-time-activity-detail />
    </div>

    <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN, insuranceTypeState)">
      <one-time-activity-detail />
    </div>

    <div v-if="isCurrentType(InsuranceTypes.REIS_BIJSTAND, insuranceTypeState)">
      <one-time-activity-detail />
    </div>

    <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING, insuranceTypeState)">
      <one-time-activity-detail />
    </div>

    <div v-if="isCurrentType(InsuranceTypes.EVENEMENTEN_VERZEKERING, insuranceTypeState)">
      <one-time-activity-detail />
    </div>

    <div v-if="isCurrentType(InsuranceTypes.MATERIAAL_VERZEKERING, insuranceTypeState)"></div>
  </div>
</template>

<script lang="ts">
import OneTimeActivityDetail from '@/components/insurances/oneTimeActivity/oneTimeActivityDetail.vue'
import { isCurrentType } from '@/helpers/insuranceTypeHelper'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { HolderStates } from '@/enums/holderStates'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceDetail',
  components: {
    'one-time-activity-detail': OneTimeActivityDetail,
  },
  setup() {
    const store = useStore()

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    const setHolderState = () => {
      store.dispatch('setHolderState', HolderStates.GENERAL)
    }
    return {
      insuranceTypeState,
      InsuranceTypes,
      setHolderState,
      isCurrentType,
    }
  },
})
</script>
