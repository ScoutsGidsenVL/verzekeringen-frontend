<template>
  <base-detail :single-page="singlePage" :data="nonMemberState" :repository="NonMemberInsuranceRepository" title="Niet leden">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <div v-if="!(holderState === HolderStates.DETAIL)">
          <div v-if="details.comment">
            <p class="font-semibold mb-0">Opmerkingen</p>
            <div class="md:ml-20 xs:ml-5 sm:ml-5">
              <label-output :text="details.comment" />
            </div>
          </div>
        </div>

        <slot></slot>

        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold mb-0">Datum</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :location="details.postCodeCity" :country="details.country ? (typeof details.country === 'object' ? details.country.id : details.country) : undefined" :insuranceType="'2'" />

        <div class="mb-3">
          <p class="font-semibold mb-0">Deelnemers</p>
          <div class="md:ml-20 xs:ml-5 sm:ml-5">
            <non-members-list :non-members-list="details.nonMembers" />
          </div>
        </div>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { NonMemberInsuranceRepository } from '@/repositories/insurances/nonMemberInsuranceRepository'

import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { computed, defineComponent } from 'vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'
import NonMembersList from '@/components/insurances/nonMembersInsurance/nonMembersList.vue'

export default defineComponent({
  name: 'NonMemberInsuranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    'non-members-list': NonMembersList,
  },
  props: {
    singlePage: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup() {
    const store = useStore()

    const nonMemberState = computed(() => {
      return store.state.insurance.nonMemberState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      NonMemberInsuranceRepository,
      nonMemberState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>
