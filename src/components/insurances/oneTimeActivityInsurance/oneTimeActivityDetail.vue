<template>
  <base-detail :data="oneTimeActivityState" :repository="OneTimeActivityRepository" title="Eenmalige activiteit">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :group-size="details.groupSize" :location="details.location" />

        <div v-if="details.comment" class="px-5">
          <label-output label="Opmerkingen" :text="details.comment" />
        </div>

        <slot></slot>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { computed, defineComponent } from 'vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'OneTimeActivityDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
  },
  setup() {
    const store = useStore()

    const oneTimeActivityState = computed(() => {
      return store.state.insurance.oneTimeActivityState
    })

    return {
      OneTimeActivityRepository,
      oneTimeActivityState,
      formatDate,
      InputTypes,
      HolderStates,
    }
  },
})
</script>
