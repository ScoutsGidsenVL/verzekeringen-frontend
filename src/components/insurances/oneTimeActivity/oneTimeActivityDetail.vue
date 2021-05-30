<template>
  <base-detail :repository="OneTimeActivityRepository" title="Eenmalige activiteit">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :group-amount="details.groupAmount" :location="details.location" />

        <custom-text-area :disabled="true" label="Opmerkingen" :text="details.comment" />
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { OneTimeActivityRepository } from '@/repositories/insurances/oneTimeActivityRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import CustomTextArea from '@/components/inputs/CustomTextArea.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatDate } from '@/helpers/formatHelper'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OneTimeActivityDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'custom-text-area': CustomTextArea,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
  },
  setup() {
    return {
      OneTimeActivityRepository,
      formatDate,
    }
  },
})
</script>
