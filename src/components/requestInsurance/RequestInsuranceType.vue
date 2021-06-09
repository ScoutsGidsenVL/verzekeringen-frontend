<template>
  <div v-if="isCurrentType(InsuranceTypes.EENMALIGE_ACTIVITEIT, insuranceTypeState)">
    <one-time-activity />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN, insuranceTypeState)">
    <non-member />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.REIS_BIJSTAND, insuranceTypeState)">
    <travel-assistance />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING, insuranceTypeState)">
    <temporary-vehicle />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.EVENEMENTEN_VERZEKERING, insuranceTypeState)">
    <event-insurance />
  </div>

  <div v-if="isCurrentType(InsuranceTypes.MATERIAAL_VERZEKERING, insuranceTypeState)">
    <div>nothing</div>
  </div>
</template>

<script lang="ts">
import OneTimeActivity from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivity.vue'
import TravelAssistance from '@/components/insurances/travelAssistance/travelAssistance.vue'
import NonMember from '@/components/insurances/nonMembersInsurance/nonMember.vue'
import TemporaryVehicle from '@/components/insurances/tempCarInsurance/temporaryVehicle.vue'
import EventInsurance from '@/components/insurances/eventInsurance/eventInsurance.vue'
import { isCurrentType } from '@/helpers/insuranceTypeHelper'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceType',
  components: {
    'one-time-activity': OneTimeActivity,
    'travel-assistance': TravelAssistance,
    'temporary-vehicle': TemporaryVehicle,
    'event-insurance': EventInsurance,
    'non-member': NonMember,
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
