<template>
  <base-detail :data="nonMemberState" :repository="NonMemberInsuranceRepository" title="Niet leden">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :location="details.postCodeCity" :country="details.country" />

        <div v-if="details.comment" class="px-5">
          <label-output label="Opmerkingen" :text="details.comment" />
        </div>
        <div class="mb-3">
          <p class="font-semibold">Deelnemers</p>
          <div class="px-5 mt-3">
            <non-members-list :nonMembersList="details.nonMembers" />
          </div>
        </div>

        <slot></slot>
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
  name: 'NonMemnerInsuranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    'non-members-list': NonMembersList,
  },
  setup() {
    const store = useStore()

    const nonMemberState = computed(() => {
      return store.state.insurance.nonMemberState
    })

    return {
      NonMemberInsuranceRepository,
      nonMemberState,
      formatDate,
      InputTypes,
      HolderStates,
    }
  },
})
</script>