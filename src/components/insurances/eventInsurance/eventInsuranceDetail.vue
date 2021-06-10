<template>
  <base-detail :data="eventInsuranceState" :repository="EventRepository" title="Evenementen verzekering">
    <template #default="{ details }">
      <div v-if="details" class="mt-1">
        <responsible-member-detail :responsible-member="details.responsibleMember" />

        <div>
          <p class="font-semibold">Datum</p>
          <div class="px-5">
            <label-output label="Periode" :text="formatDate(details.startDate, details.endDate)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :event-size="details.eventSize" :location="details.location" />

        <div v-if="!(holderState === HolderStates.DETAIL)">
          <p class="font-semibold">Opmerkingen</p>
          <div v-if="details.comment" class="px-5">
            <label-output :text="details.comment" />
          </div>
        </div>

        <slot></slot>
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import { EventRepository } from '@/repositories/insurances/eventRepository'
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import { formatDate } from '@/helpers/formatHelper'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'EventInsuranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
  },
  setup() {
    const store = useStore()

    const eventInsuranceState = computed(() => {
      return store.state.insurance.eventState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      EventRepository,
      eventInsuranceState,
      formatDate,
      InputTypes,
      HolderStates,
      holderState,
    }
  },
})
</script>