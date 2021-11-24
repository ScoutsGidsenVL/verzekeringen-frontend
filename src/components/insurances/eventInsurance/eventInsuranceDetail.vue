<template>
  <base-detail :single-page="singlePage" :data="eventInsuranceState" :repository="EventRepository" title="evenementenverzekering">
    <template #default="{ details }">
      <div v-if="details && details.status && details.status.label === 'Goedgekeurd'">
        <participants-file-section :inscuranceType="'events'" :details="details"></participants-file-section>
      </div>

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
            <label-output label="Periode" :text="formatEventDate(details.startDate, details.startTime, details.endDate, details.endTime)" />
          </div>
        </div>

        <activity-detail :nature="details.nature" :event-size="details.eventSize" :location="details.location" />
      </div>
    </template>
  </base-detail>
</template>

<script lang="ts">
import ResponsibleMemberDetail from '@/components/semantic/detail/ResponsibleMemberDetail.vue'
import CustomHeadline2 from '@/components/customHeadlines/CustomHeadline2.vue'
import ActivityDetail from '@/components/semantic/detail/ActivityDetail.vue'
import { EventRepository } from '@/repositories/insurances/eventRepository'
import BaseDetail from '@/components/semantic/detail/BaseDetail.vue'
import ParticipantsFileSection from '@/components/semantic/ParticipantsFileSection.vue'
import LabelOutput from '@/components/semantic/LabelOutput.vue'
import FileUpload from '@/components/semantic/FileUpload.vue'
import { formatEventDate } from '@/helpers/formatHelper'
import { computed, defineComponent } from 'vue'
import { HolderStates } from '@/enums/holderStates'
import { InputTypes } from '@/enums/inputTypes'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'EventInsuranceDetail',
  components: {
    'responsible-member-detail': ResponsibleMemberDetail,
    'activity-detail': ActivityDetail,
    'label-output': LabelOutput,
    'base-detail': BaseDetail,
    ParticipantsFileSection
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

    const eventInsuranceState = computed(() => {
      return store.state.insurance.eventState
    })

    const holderState = computed((): HolderStates => {
      return store.state.insurance.holderState
    })

    return {
      eventInsuranceState,
      EventRepository,
      formatEventDate,
      CustomHeadline2,
      HolderStates,
      holderState,
      InputTypes,
      FileUpload,
    }
  },
})
</script>
