<template>
  <div v-if="isCurrentType(InsuranceTypes.EENMALIGE_ACTIVITEIT, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.REIS_BIJSTAND, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.EVENEMENTEN_VERZEKERING, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.MATERIAAL_VERZEKERING, insuranceTypeState)">
    <one-time-activity />
  </div>
</template>

<script lang="ts">
import OneTimeActivity from '@/components/insurances/oneTimeActivity/oneTimeActivity.vue'
import { isCurrentType } from '@/helpers/insuranceTypeHelper'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'one-time-activity': OneTimeActivity,
  },
  setup() {
    const store = useStore()

    const insuranceTypeState = computed((): InsuranceTypes => {
      return store.state.insurance.insuranceTypeState
    })

    return {
      insuranceTypeState,
      InsuranceTypes,
      isCurrentType,
    }
  },
})
</script>
