<template>
  <div>
    <div v-if="isCurrentType(InsuranceTypes.EENMALIGE_ACTIVITEIT, insuranceTypeState)">
      <one-time-activity-detail><slot></slot></one-time-activity-detail>
    </div>

    <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_VERZEKERING_NIET_LEDEN, insuranceTypeState)">
      <non-member-insurance-detail><slot></slot></non-member-insurance-detail>
    </div>

    <div v-if="isCurrentType(InsuranceTypes.REIS_BIJSTAND, insuranceTypeState)">
      <travel-assistance-detail><slot></slot></travel-assistance-detail>
    </div>

    <div v-if="isCurrentType(InsuranceTypes.TIJDELIJKE_AUTO_VERZEKERING, insuranceTypeState)">LEEG</div>

    <div v-if="isCurrentType(InsuranceTypes.EVENEMENTEN_VERZEKERING, insuranceTypeState)">
      <event-detail><slot></slot></event-detail>
    </div>

    <div v-if="isCurrentType(InsuranceTypes.MATERIAAL_VERZEKERING, insuranceTypeState)"></div>
  </div>
</template>

<script lang="ts">
import OneTimeActivityDetail from '@/components/insurances/oneTimeActivityInsurance/oneTimeActivityDetail.vue'
import NonMemberInsuranceDetail from '@/components/insurances/nonMembersInsurance/nonMemberDetail.vue'
import TravelAssistanceDetail from '@/components/insurances/travelAssistance/travelAssistanceDetail.vue'
import EventDetail from '@/components/insurances/eventInsurance/eventInsuranceDetail.vue'
import { isCurrentType } from '@/helpers/insuranceTypeHelper'
import { InsuranceTypes } from '@/enums/insuranceTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'RequestInsuranceDetail',
  components: {
    'one-time-activity-detail': OneTimeActivityDetail,
    'non-member-insurance-detail': NonMemberInsuranceDetail,
    'travel-assistance-detail': TravelAssistanceDetail,
    'event-detail': EventDetail,
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
